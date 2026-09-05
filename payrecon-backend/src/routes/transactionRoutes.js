import express from "express";
import { getTransactions, getTransactionStats } from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTransactions);
router.get("/stats", protect, getTransactionStats);

export default router;
