import express from "express";
import {
  createBatch,
  getBatches,
  getBatchById,
  uploadLedgerFile,
  uploadBankFile,
  reconcileBatch,
  getReconciliationSummary,
  getBatchDetails,
  submitBatch,
  getPendingReviewBatches,
  approveBatch,
  rejectBatch,
  resubmitBatch,
  getReconciliationResults,
  getBatchStats,
  getReconciliationStats,
} from "../controllers/batchController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import upload from "../middleware/uploadMiddleware.js";
import multer from "multer";

const router = express.Router();

const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size must not exceed 10 MB.",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next();
};

// Collection routes
router.post("/", protect, authorizeRoles("MAKER", "ADMIN"), createBatch);
router.get(
  "/",
  protect,
  authorizeRoles("ADMIN", "MAKER", "CHECKER"),
  getBatches,
);

router.get("/batch-stats", protect, getBatchStats);

// Static routes
router.get(
  "/pending-review",
  protect,
  authorizeRoles("CHECKER"),
  getPendingReviewBatches,
);

// Parameterized routes
router.post(
  "/:id/upload-ledger",
  protect,
  authorizeRoles("MAKER", "ADMIN"),
  upload.single("file"),
  handleUploadError,
  uploadLedgerFile,
);

router.post(
  "/:id/upload-bank",
  protect,
  authorizeRoles("MAKER", "ADMIN"),
  upload.single("file"),
  uploadBankFile,
);

router.get("/:id/details", protect, getBatchDetails);
router.get("/:id/reconciliation-summary", protect, getReconciliationSummary);
router.get("/:id/reconciliation-results", protect, getReconciliationResults);
router.post("/:id/reconcile", protect, reconcileBatch);
router.get("/reconciliation-stats", protect, getReconciliationStats);
router.patch("/:id/submit", protect, authorizeRoles("MAKER"), submitBatch);
router.patch("/:id/approve", protect, authorizeRoles("CHECKER"), approveBatch);
router.patch("/:id/reject", protect, authorizeRoles("CHECKER"), rejectBatch);
router.patch("/:id/resubmit", protect, authorizeRoles("MAKER"), resubmitBatch);

// Generic route (ALWAYS LAST)
router.get("/:id", protect, authorizeRoles("ADMIN", "MAKER"), getBatchById);

export default router;
