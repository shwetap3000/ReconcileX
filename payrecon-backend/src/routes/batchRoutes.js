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
} from "../controllers/batchController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("MAKER", "ADMIN"), createBatch);
router.get("/", protect, authorizeRoles("ADMIN", "MAKER"), getBatches);

// always keep specific routes first and parameterized routes later
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

router.get("/:id/reconciliation-summary", protect, getReconciliationSummary);
router.post("/:id/reconcile", protect, reconcileBatch);
router.get("/:id", protect, authorizeRoles("ADMIN", "MAKER"), getBatchById);
router.get("/:id/details", protect, getBatchDetails);
router.patch("/:id/submit", protect, authorizeRoles("MAKER"), submitBatch);

export default router;
