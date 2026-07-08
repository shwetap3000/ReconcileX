import express from "express";
import { getReconciliationSummary, getBatchReport } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/reconciliation-summary", protect, getReconciliationSummary);
router.get("/batch-report", protect, authorizeRoles("ADMIN"), getBatchReport);

export default router;
