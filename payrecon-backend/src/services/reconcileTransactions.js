import LedgerTransaction from "../models/LedgerTransaction.js";
import BankTransaction from "../models/BankTransaction.js";

const reconcileTransactions = async (batchId) => {
  // Fetch all transactions for this batch
  const ledgerTransactions = await LedgerTransaction.find({ batchId });
  const bankTransactions = await BankTransaction.find({ batchId });

  // Counters
  let matched = 0;
  let missingInBank = 0;
  let missingInLedger = 0;

  // match ledger - bank transaction
  for (const ledger of ledgerTransactions) {
    const bank = bankTransactions.find(
      (bank) =>
        !bank.matchedLedgerTransaction &&
        bank.referenceNumber === ledger.referenceNumber &&
        bank.amount === ledger.amount &&
        new Date(bank.transactionDate).getTime() ===
          new Date(ledger.transactionDate).getTime()
    );

    if (bank) {
      ledger.reconciliationStatus = "MATCHED";
      ledger.status = "MATCHED";
      ledger.matchedBankTransaction = bank._id;

      bank.reconciliationStatus = "MATCHED";
      bank.status = "MATCHED";
      bank.matchedLedgerTransaction = ledger._id;

      await ledger.save();
      await bank.save();

      matched++;
    } else {
      ledger.reconciliationStatus = "MISSING_IN_BANK";
      ledger.status = "MISSING";

      await ledger.save();

      missingInBank++;
    }
  }

  // find bank records without ledger
  for (const bank of bankTransactions) {
    if (!bank.matchedLedgerTransaction) {
      bank.reconciliationStatus = "MISSING_IN_LEDGER";
      bank.status = "MISSING";

      await bank.save();

      missingInLedger++;
    }
  }

  // Fetch updated records
  const updatedLedgerTransactions = await LedgerTransaction.find({ batchId });
  const updatedBankTransactions = await BankTransaction.find({ batchId });

  return {
    matched,
    missingInBank,
    missingInLedger,
    ledgerTransactions: updatedLedgerTransactions,
    bankTransactions: updatedBankTransactions,
  };
};

export default reconcileTransactions;