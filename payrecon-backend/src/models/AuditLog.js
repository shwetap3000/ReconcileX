import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: [
        // Authentication
        "LOGIN",
        "LOGOUT",

        // User Management
        "USER_CREATED",
        "USER_UPDATED",
        "USER_ACTIVATED",
        "USER_DEACTIVATED",
        "USER_ROLE_UPDATED",

        // Batch Management
        "BATCH_CREATED",
        "BATCH_UPDATED",
        "BATCH_DELETED",
        "BATCH_SUBMITTED",

        // File Upload
        "LEDGER_UPLOADED",
        "BANK_UPLOADED",
        "LEDGER_REPLACED",
        "BANK_REPLACED",

        // Workflow
        "BATCH_APPROVED",
        "BATCH_REJECTED",
        "REVIEW_COMMENT_ADDED",
        "BATCH_RESUBMITTED",

        // Profile
        "PROFILE_UPDATED",
        "PASSWORD_CHANGED",

        // Reports
        "REPORT_DOWNLOADED",

        // Reconciliation (Later)
        "RECONCILIATION_STARTED",
        "RECONCILIATION_COMPLETED",
        "RECONCILIATION_FAILED",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "MAKER", "CHECKER"],
      required: true,
    },

    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      default: null,
    },

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      default: "SUCCESS",
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    ipAddress: {
      type: String,
      default: "",
    },

    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;
