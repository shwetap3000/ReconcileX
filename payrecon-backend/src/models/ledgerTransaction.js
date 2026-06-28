import mongoose from "mongoose";

const ledgerTransactionSchema = new mongoose.Schema(
  {
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
      index: true,
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
  },
  {
    timestamps: true,
  }
);

const LedgerTransaction = mongoose.model(
  "LedgerTransaction",
  ledgerTransactionSchema
);

export default LedgerTransaction;
