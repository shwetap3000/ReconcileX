import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    batchId: {
      type: String,
      required: true,
      unique: true,
    },

    batchName: {
      type: String,
      required: true,
      trim: true,
    },

    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BatchFile",
      },
    ],

    status: {
      type: String,
      enum: [
        "DRAFT",
        "PARTIAL_UPLOAD",
        "UPLOADED",
        "SUBMITTED",
        "UNDER_REVIEW",
        "APPROVED",
        "REJECTED",
        "RECONCILED",
      ],
      default: "DRAFT",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdByName: {
      type: String,
      required: true,
    },

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    submittedAt: Date,

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    reviewedAt: Date,

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: Date,

    totalLedgerTransactions: {
      type: Number,
      default: 0,
    },

    totalBankTransactions: {
      type: Number,
      default: 0,
    },

    validationErrors: [String],

    validationWarnings: [String],

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Batch = mongoose.model("Batch", batchSchema);

export default Batch;
