import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/stats", protect, authorizeRoles("ADMIN"), getDashboardStats);

export default router;
