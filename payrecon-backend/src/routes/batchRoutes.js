import express from "express";
import { createBatch } from "../controllers/batchController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("MAKER", "ADMIN"), createBatch);

export default router;
