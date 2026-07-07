import express from "express";
import { getReconciliationSummary } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/reconciliation-summary",
    protect,
    getReconciliationSummary
);

export default router;