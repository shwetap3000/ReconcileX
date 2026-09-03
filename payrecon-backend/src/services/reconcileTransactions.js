import LedgerTransaction from "../models/LedgerTransaction.js";
import BankTransaction from "../models/BankTransaction.js";
import Batch from "../models/Batch.js";

// Convert a date to YYYY-MM-DD.
// This allows us to compare dates while ignoring the time.
const getDateOnly = (value) => {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().split("T")[0];
};

const reconcileTransactions = async (batchId) => {
  // 1. RESET PREVIOUS RECONCILIATION RESULTS

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

  // 2. FETCH TRANSACTIONS

  const ledgerTransactions = await LedgerTransaction.find({
    batchId,
  });

  const bankTransactions = await BankTransaction.find({
    batchId,
  });

  // 3. COUNTERS

  let matched = 0;
  let missingInBank = 0;
  let missingInLedger = 0;
  let amountMismatch = 0;
  let dateMismatch = 0;

  // 4. MATCH LEDGER TRANSACTIONS WITH BANK TRANSACTIONS

  for (const ledger of ledgerTransactions) {
    const ledgerReference = ledger.referenceNumber.trim();

    // Find all unused Bank transactions having the same reference.
    const candidates = bankTransactions.filter(
      (bank) =>
        !bank.matchedLedgerTransaction &&
        bank.referenceNumber.trim() === ledgerReference,
    );

    // -------------------------------------------------------
    // NO REFERENCE MATCH
    // -------------------------------------------------------

    if (candidates.length === 0) {
      ledger.status = "MISSING";
      ledger.reconciliationStatus = "MISSING_IN_BANK";
      ledger.matchedBankTransaction = null;

      await ledger.save();

      missingInBank++;

      continue;
    }

    // -------------------------------------------------------
    // FIND CANDIDATE WITH SAME AMOUNT
    // -------------------------------------------------------

    const amountMatch = candidates.find(
      (bank) => bank.amount === ledger.amount,
    );

    // Use the amount-matching candidate if available.
    // Otherwise use the first reference-matching candidate
    // so that we can report an amount mismatch.
    const bank = amountMatch || candidates[0];

    // -------------------------------------------------------
    // AMOUNT MISMATCH
    // -------------------------------------------------------

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

    // -------------------------------------------------------
    // DATE COMPARISON
    // -------------------------------------------------------

    const ledgerDate = getDateOnly(ledger.transactionDate);
    const bankDate = getDateOnly(bank.transactionDate);

    // -------------------------------------------------------
    // DATE MISMATCH
    // -------------------------------------------------------

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

    // -------------------------------------------------------
    // PERFECT MATCH
    // -------------------------------------------------------

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

  // 5. FIND BANK TRANSACTIONS MISSING IN LEDGER

  for (const bank of bankTransactions) {
    if (!bank.matchedLedgerTransaction) {
      bank.status = "MISSING";
      bank.reconciliationStatus = "MISSING_IN_LEDGER";
      bank.matchedLedgerTransaction = null;

      await bank.save();

      missingInLedger++;
    }
  }

  // 6. UPDATE BATCH RECONCILIATION SUMMARY

  const batch = await Batch.findById(batchId);

  if (!batch) {
    throw new Error("Batch not found");
  }

  batch.matchedTransactions = matched;
  batch.amountMismatchCount = amountMismatch;
  batch.dateMismatchCount = dateMismatch;
  batch.missingInBankCount = missingInBank;
  batch.missingInLedgerCount = missingInLedger;

  batch.status = "RECONCILED";

  await batch.save();

  // 7. RETURN RECONCILIATION RESULT

  return {
    batchId,

    totalLedgerTransactions: ledgerTransactions.length,
    totalBankTransactions: bankTransactions.length,

    matched,
    amountMismatch,
    dateMismatch,
    missingInBank,
    missingInLedger,

    ledgerTransactions: await LedgerTransaction.find({
      batchId,
    }),

    bankTransactions: await BankTransaction.find({
      batchId,
    }),
  };
};

export default reconcileTransactions;
