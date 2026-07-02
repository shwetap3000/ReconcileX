import LedgerTransaction from "../models/LedgerTransaction.js";
import BankTransaction from "../models/BankTransaction.js";

const reconcileTransactions = async (batchId) => {
  // Fetch all transactions for this batch
  const ledgerTransactions = await LedgerTransaction.find({ batchId });

  const bankTransactions = await BankTransaction.find({ batchId });

  return {
    ledgerTransactions,
    bankTransactions,
  };
};

export default reconcileTransactions;