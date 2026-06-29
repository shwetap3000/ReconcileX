import mongoose from "mongoose";

const batchFileSchema = new mongoose.Schema(
  {
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },

    fileType: {
      type: String,
      enum: ["LEDGER", "BANK"],
      required: true,
    },

    version: {
      type: Number,
      default: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
      trim: true,
    },

    storedFileName: {
      type: String,
      required: true,
      trim: true,
    },

    filePath: {
      type: String,
      required: true,
      trim: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    uploadStatus: {
      type: String,
      enum: ["UPLOADED", "PROCESSING", "PROCESSED", "FAILED"],
      default: "UPLOADED",
    },
  },
  {
    timestamps: true,
  },
);

const BatchFile = mongoose.model("BatchFile", batchFileSchema);

export default BatchFile;
