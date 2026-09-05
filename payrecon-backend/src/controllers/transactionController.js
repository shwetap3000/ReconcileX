import LedgerTransaction from "../models/LedgerTransaction.js";
import BankTransaction from "../models/BankTransaction.js";
import Batch from "../models/Batch.js";

export const getTransactions = async (req, res) => {
  try {
    const { role, _id } = req.user;

    let batchQuery = {};

    // Same visibility rules as the Batch page
    switch (role) {
      case "ADMIN":
        batchQuery = {};
        break;

      case "MAKER":
        batchQuery = {
          createdBy: _id,
        };
        break;

      case "CHECKER":
        batchQuery = {
          status: {
            $in: ["SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED"],
          },
        };
        break;

      default:
        return res.status(403).json({
          success: false,
          message: "Unauthorized role",
        });
    }

    // Get batches visible to this user
    const batches = await Batch.find(batchQuery).select("_id batchId").lean();

    const batchIds = batches.map((batch) => batch._id);

    // If there are no visible batches
    if (batchIds.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        transactions: [],
      });
    }

    // Get all ledger transactions
    const ledgerTransactions = await LedgerTransaction.find({
      batchId: { $in: batchIds },
    })
      .populate(
        "matchedBankTransaction",
        "referenceNumber amount transactionDate reconciliationStatus",
      )
      .sort({ transactionDate: -1 })
      .lean();

    // Get ALL bank transactions
    const bankTransactions = await BankTransaction.find({
      batchId: { $in: batchIds },
    })
      .sort({ transactionDate: -1 })
      .lean();

    const batchMap = new Map(
      batches.map((batch) => [batch._id.toString(), batch.batchId]),
    );

    const transactions = [];

    // --------------------------------------------------
    // 1. LEDGER-SIDE RESULTS
    // --------------------------------------------------

    for (const ledger of ledgerTransactions) {
      const bank = ledger.matchedBankTransaction;

      let status = "PENDING";

      switch (ledger.reconciliationStatus) {
        case "MATCHED":
          status = "MATCHED";
          break;

        case "AMOUNT_MISMATCH":
          status = "AMOUNT_MISMATCH";
          break;

        case "DATE_MISMATCH":
          status = "DATE_MISMATCH";
          break;

        case "MISSING_IN_BANK":
          status = "MISSING_IN_BANK";
          break;

        case "MISSING_IN_LEDGER":
          status = "MISSING_IN_LEDGER";
          break;

        case "PENDING":
        default:
          status = "PENDING";
          break;
      }

      const ledgerAmount = ledger.amount ?? null;
      const bankAmount = bank?.amount ?? null;

      let difference = null;

      if (ledgerAmount !== null && bankAmount !== null) {
        difference = Math.abs(ledgerAmount - bankAmount);
      } else if (ledgerAmount !== null) {
        difference = ledgerAmount;
      }

      transactions.push({
        reconciliationId: `REC-${ledger._id
          .toString()
          .slice(-6)
          .toUpperCase()}`,

        ledgerRef: ledger.referenceNumber || "—",

        bankRef: bank?.referenceNumber || "—",

        batch: batchMap.get(ledger.batchId.toString()) || "—",

        ledgerAmount,

        bankAmount,

        difference,

        status,

        transactionDate: ledger.transactionDate,
      });
    }

    // --------------------------------------------------
    // 2. BANK-ONLY RESULTS
    // --------------------------------------------------
    // These are bank transactions that do NOT have
    // a matched ledger transaction.
    //
    // They must appear as MISSING_IN_LEDGER.
    // --------------------------------------------------

    for (const bank of bankTransactions) {
      if (bank.matchedLedgerTransaction) {
        continue;
      }

      // Only add genuine bank-side missing records.
      if (bank.reconciliationStatus !== "MISSING_IN_LEDGER") {
        continue;
      }

      const bankAmount = bank.amount ?? null;

      transactions.push({
        reconciliationId: `REC-${bank._id.toString().slice(-6).toUpperCase()}`,

        ledgerRef: "—",

        bankRef: bank.referenceNumber || "—",

        batch: batchMap.get(bank.batchId.toString()) || "—",

        ledgerAmount: null,

        bankAmount,

        difference: bankAmount,

        status: "MISSING_IN_LEDGER",

        transactionDate: bank.transactionDate,
      });
    }

    // --------------------------------------------------
    // 3. Sort everything by transaction date
    // --------------------------------------------------

    transactions.sort((a, b) => {
      const dateA = new Date(a.transactionDate).getTime();
      const dateB = new Date(b.transactionDate).getTime();

      return dateB - dateA;
    });

    // Remove internal sorting field before sending response
    const formattedTransactions = transactions.map(
      ({ transactionDate, ...transaction }) => transaction,
    );

    return res.status(200).json({
      success: true,
      count: formattedTransactions.length,
      transactions: formattedTransactions,
    });
  } catch (error) {
    console.error("Get Transactions Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
