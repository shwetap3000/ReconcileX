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
} from "../controllers/batchController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Collection routes
router.post("/", protect, authorizeRoles("MAKER", "ADMIN"), createBatch);
router.get("/", protect, authorizeRoles("ADMIN", "MAKER"), getBatches);

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
router.post("/:id/reconcile", protect, reconcileBatch);
router.patch("/:id/submit", protect, authorizeRoles("MAKER"), submitBatch);
router.patch("/:id/approve", protect, authorizeRoles("CHECKER"), approveBatch);
router.patch("/:id/reject", protect, authorizeRoles("CHECKER"), rejectBatch);
router.patch("/:id/resubmit", protect, authorizeRoles("MAKER"), resubmitBatch);

// Generic route (ALWAYS LAST)
router.get("/:id", protect, authorizeRoles("ADMIN", "MAKER"), getBatchById);

export default router;
