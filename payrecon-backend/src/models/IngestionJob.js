import mongoose from "mongoose";

const ingestionJobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
      index: true,
    },

    batchFileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BatchFile",
      required: true,
      index: true,
    },

    fileType: {
      type: String,
      enum: ["LEDGER", "BANK"],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "RECEIVED",
        "PARSING",
        "VALIDATING",
        "TRANSFORMING",
        "DEDUPLICATING",
        "LOADING",
        "COMPLETED",
        "FAILED",
      ],
      default: "RECEIVED",
      index: true,
    },

    totalRows: {
      type: Number,
      default: 0,
    },

    validRecords: {
      type: Number,
      default: 0,
    },

    invalidRecords: {
      type: Number,
      default: 0,
    },

    duplicateRecords: {
      type: Number,
      default: 0,
    },

    errors: [
      {
        row: Number,
        field: String,
        message: String,
        value: mongoose.Schema.Types.Mixed,
      },
    ],

    startedAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },

    processingDurationMs: {
      type: Number,
      default: 0,
    },

    retryCount: {
      type: Number,
      default: 0,
    },

    errorMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const IngestionJob = mongoose.model("IngestionJob", ingestionJobSchema);

export default IngestionJob;
