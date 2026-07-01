import mongoose from "mongoose";

const bankTransactionSchema = new mongoose.Schema(
  {
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },

    transactionType: {
      type: String,
      enum: ["DEBIT", "CREDIT"],
      required: true,
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

    matchedLedgerTransaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LedgerTransaction",
      default: null,
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const BankTransaction = mongoose.model(
  "BankTransaction",
  bankTransactionSchema,
);

export default BankTransaction;
