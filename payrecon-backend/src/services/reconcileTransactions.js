import LedgerTransaction from "../models/LedgerTransaction.js";
import BankTransaction from "../models/BankTransaction.js";

const reconcileTransactions = async (batchId) => {
  // Reset previous reconciliation results
  await LedgerTransaction.updateMany(
    { batchId },
    {
      $set: {
        status: "PENDING",
        reconciliationStatus: "PENDING",
        matchedBankTransaction: null,
      },
    }
  );

  await BankTransaction.updateMany(
    { batchId },
    {
      $set: {
        status: "PENDING",
        reconciliationStatus: "PENDING",
        matchedLedgerTransaction: null,
      },
    }
  );

  // Fetch fresh transactions
  const ledgerTransactions = await LedgerTransaction.find({ batchId });
  const bankTransactions = await BankTransaction.find({ batchId });

  // Counters
  let matched = 0;
  let missingInBank = 0;
  let missingInLedger = 0;
  let amountMismatch = 0;
  let dateMismatch = 0;

  // Match Ledger -> Bank
  for (const ledger of ledgerTransactions) {
    const bank = bankTransactions.find(
      (b) =>
        !b.matchedLedgerTransaction &&
        b.referenceNumber === ledger.referenceNumber
    );

    // Missing in Bank
    if (!bank) {
      ledger.status = "MISSING";
      ledger.reconciliationStatus = "MISSING_IN_BANK";
      ledger.matchedBankTransaction = null;

      await ledger.save();
      missingInBank++;
      continue;
    }

    // Amount Mismatch
    if (bank.amount !== ledger.amount) {
      ledger.status = "MISMATCH";
      ledger.reconciliationStatus = "AMOUNT_MISMATCH";
      ledger.matchedBankTransaction = bank._id;

      bank.status = "MISMATCH";
      bank.reconciliationStatus = "AMOUNT_MISMATCH";
      bank.matchedLedgerTransaction = ledger._id;

      await ledger.save();
      await bank.save();

      amountMismatch++;
      continue;
    }

    // Compare only the date (ignore time)
    const ledgerDate = new Date(ledger.transactionDate)
      .toISOString()
      .split("T")[0];

    const bankDate = new Date(bank.transactionDate)
      .toISOString()
      .split("T")[0];

    if (ledgerDate !== bankDate) {
      ledger.status = "MISMATCH";
      ledger.reconciliationStatus = "DATE_MISMATCH";
      ledger.matchedBankTransaction = bank._id;

      bank.status = "MISMATCH";
      bank.reconciliationStatus = "DATE_MISMATCH";
      bank.matchedLedgerTransaction = ledger._id;

      await ledger.save();
      await bank.save();

      dateMismatch++;
      continue;
    }

    // Perfect Match
    ledger.status = "MATCHED";
    ledger.reconciliationStatus = "MATCHED";
    ledger.matchedBankTransaction = bank._id;

    bank.status = "MATCHED";
    bank.reconciliationStatus = "MATCHED";
    bank.matchedLedgerTransaction = ledger._id;

    await ledger.save();
    await bank.save();

    matched++;
  }

  // Remaining Bank Transactions = Missing in Ledger
  for (const bank of bankTransactions) {
    if (!bank.matchedLedgerTransaction) {
      bank.status = "MISSING";
      bank.reconciliationStatus = "MISSING_IN_LEDGER";
      bank.matchedLedgerTransaction = null;

      await bank.save();

      missingInLedger++;
    }
  }

  // Fetch updated records
  const updatedLedgerTransactions = await LedgerTransaction.find({ batchId });
  const updatedBankTransactions = await BankTransaction.find({ batchId });

  return {
    matched,
    amountMismatch,
    dateMismatch,
    missingInBank,
    missingInLedger,

    totalLedgerTransactions: updatedLedgerTransactions.length,
    totalBankTransactions: updatedBankTransactions.length,

    ledgerTransactions: updatedLedgerTransactions,
    bankTransactions: updatedBankTransactions,
  };
};

export default reconcileTransactions;







// import LedgerTransaction from "../models/LedgerTransaction.js";
// import BankTransaction from "../models/BankTransaction.js";

// const reconcileTransactions = async (batchId) => {
//   // Fetch transactions
//   const ledgerTransactions = await LedgerTransaction.find({ batchId });
//   const bankTransactions = await BankTransaction.find({ batchId });

//   // Counters
//   let matched = 0;
//   let missingInBank = 0;
//   let missingInLedger = 0;
//   let amountMismatch = 0;
//   let dateMismatch = 0;

//   // Match ledger to bank
//   for (const ledger of ledgerTransactions) {
//     // Find bank transaction using Reference Number
//     const bank = bankTransactions.find(
//       (bank) =>
//         !bank.matchedLedgerTransaction &&
//         bank.referenceNumber === ledger.referenceNumber,
//     );

//     // if no bank transaction found
//     if (!bank) {
//       ledger.reconciliationStatus = "MISSING_IN_BANK";
//       ledger.status = "MISSING";

//       await ledger.save();

//       missingInBank++;
//       continue;
//     }

//     // amount mismatch
//     if (bank.amount !== ledger.amount) {
//       ledger.reconciliationStatus = "AMOUNT_MISMATCH";
//       ledger.status = "MISMATCH";
//       ledger.matchedBankTransaction = bank._id;

//       bank.reconciliationStatus = "AMOUNT_MISMATCH";
//       bank.status = "MISMATCH";
//       bank.matchedLedgerTransaction = ledger._id;

//       await ledger.save();
//       await bank.save();

//       amountMismatch++;
//       continue;
//     }

//     // date mismatch
//     if (
//       new Date(bank.transactionDate).getTime() !==
//       new Date(ledger.transactionDate).getTime()
//     ) {
//       ledger.reconciliationStatus = "DATE_MISMATCH";
//       ledger.status = "MISMATCH";
//       ledger.matchedBankTransaction = bank._id;

//       bank.reconciliationStatus = "DATE_MISMATCH";
//       bank.status = "MISMATCH";
//       bank.matchedLedgerTransaction = ledger._id;

//       await ledger.save();
//       await bank.save();

//       dateMismatch++;
//       continue;
//     }

//     // perfect match
//     ledger.reconciliationStatus = "MATCHED";
//     ledger.status = "MATCHED";
//     ledger.matchedBankTransaction = bank._id;

//     bank.reconciliationStatus = "MATCHED";
//     bank.status = "MATCHED";
//     bank.matchedLedgerTransaction = ledger._id;

//     await ledger.save();
//     await bank.save();

//     matched++;
//   }

//   // to find transaction present in bank but not in ledger
//   for (const bank of bankTransactions) {
//     if (!bank.matchedLedgerTransaction) {
//       bank.reconciliationStatus = "MISSING_IN_LEDGER";
//       bank.status = "MISSING";

//       await bank.save();

//       missingInLedger++;
//     }
//   }

//   // Fetch updated transactions
//   const updatedLedgerTransactions = await LedgerTransaction.find({ batchId });

//   const updatedBankTransactions = await BankTransaction.find({ batchId });

//   return {
//     matched,
//     amountMismatch,
//     dateMismatch,
//     missingInBank,
//     missingInLedger,

//     totalLedgerTransactions: updatedLedgerTransactions.length,
//     totalBankTransactions: updatedBankTransactions.length,

//     ledgerTransactions: updatedLedgerTransactions,
//     bankTransactions: updatedBankTransactions,
//   };
// };

// export default reconcileTransactions;