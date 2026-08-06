import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getAuditLogs,
  getAuditStats,
  getAuditLogById,
} from "../controllers/auditController.js";

const router = express.Router();

router.get("/", protect, getAuditLogs);

router.get("/stats", protect, getAuditStats);

router.get("/:id", protect, getAuditLogById);

export default router;
