import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getDashboardStats,
  getRecentBatches,
  getRecentActivities,
  getStatusDistribution,
  getMonthlyTrend,
} from "../controllers/dashboardController.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);
router.get("/recent-batches", protect, getRecentBatches);
router.get("/recent-activities", protect, getRecentActivities);
router.get("/status-distribution", protect, getStatusDistribution);
router.get("/monthly-trend", protect, getMonthlyTrend);

export default router;
