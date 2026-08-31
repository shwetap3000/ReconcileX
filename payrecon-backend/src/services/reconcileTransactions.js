import LedgerTransaction from "../models/LedgerTransaction.js";
import BankTransaction from "../models/BankTransaction.js";
import Batch from "../models/Batch.js";

const getDateOnly = (value) => {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().split("T")[0];
};

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
    },
  );

  await BankTransaction.updateMany(
    { batchId },
    {
      $set: {
        status: "PENDING",
        reconciliationStatus: "PENDING",
        matchedLedgerTransaction: null,
      },
    },
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

  // Match Ledger to Bank
  for (const ledger of ledgerTransactions) {
    const bank = bankTransactions.find(
      (b) =>
        !b.matchedLedgerTransaction &&
        b.referenceNumber.trim() === ledger.referenceNumber.trim(),
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

    // Compare only dates (ignore time)
    const ledgerDate = getDateOnly(ledger.transactionDate);
    const bankDate = getDateOnly(bank.transactionDate);

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

  // Missing in Ledger
  for (const bank of bankTransactions) {
    if (!bank.matchedLedgerTransaction) {
      bank.status = "MISSING";
      bank.reconciliationStatus = "MISSING_IN_LEDGER";
      bank.matchedLedgerTransaction = null;

      await bank.save();

      missingInLedger++;
    }
  }

  // Update Batch Summary
  const batch = await Batch.findById(batchId);

  if (batch) {
    batch.matchedTransactions = matched;
    batch.amountMismatchCount = amountMismatch;
    batch.dateMismatchCount = dateMismatch;
    batch.missingInBankCount = missingInBank;
    batch.missingInLedgerCount = missingInLedger;

    batch.status = "RECONCILED";

    await batch.save();
  }

  // Fetch updated transactions
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
