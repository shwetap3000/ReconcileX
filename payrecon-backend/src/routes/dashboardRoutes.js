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

router.get("/stats", protect, authorizeRoles("ADMIN"), getDashboardStats);

router.get(
  "/recent-batches",
  protect,
  authorizeRoles("ADMIN"),
  getRecentBatches,
);
router.get(
  "/recent-activities",
  protect,
  authorizeRoles("ADMIN"),
  getRecentActivities,
);
router.get(
  "/status-distribution",
  protect,
  authorizeRoles("ADMIN"),
  getStatusDistribution,
);

router.get("/monthly-trend", protect, authorizeRoles("ADMIN"), getMonthlyTrend);

export default router;
