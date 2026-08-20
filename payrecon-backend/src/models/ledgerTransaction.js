import mongoose from "mongoose";

const ledgerTransactionSchema = new mongoose.Schema(
  {
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
      index: true,
    },

    // Ingestion lineage
    sourceFileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BatchFile",
      required: true,
      index: true,
    },

    ingestionJobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IngestionJob",
      required: true,
      index: true,
    },

    sourceRowNumber: {
      type: Number,
      required: true,
    },

    transactionId: {
      type: String,
      required: true,
      trim: true,
    },

    referenceNumber: {
      type: String,
      required: true,
      trim: true,
    },

    transactionDate: {
      type: Date,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "MATCHED", "MISMATCH", "MISSING"],
      default: "PENDING",
    },

    reconciliationStatus: {
      type: String,
      enum: [
        "PENDING",
        "MATCHED",
        "MISSING_IN_BANK",
        "AMOUNT_MISMATCH",
        "DATE_MISMATCH",
      ],
      default: "PENDING",
    },

    matchedBankTransaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BankTransaction",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const LedgerTransaction = mongoose.model(
  "LedgerTransaction",
  ledgerTransactionSchema,
);

export default LedgerTransaction;
