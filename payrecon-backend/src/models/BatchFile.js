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
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    cloudinaryId: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    uploadedByName: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const BatchFile = mongoose.model(
  "BatchFile",
  batchFileSchema
);

export default BatchFile;