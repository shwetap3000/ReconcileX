import express from "express";
import { createBatch, getBatches, getBatchById } from "../controllers/batchController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("MAKER", "ADMIN"), createBatch);
router.get("/", protect, authorizeRoles("ADMIN", "MAKER"), getBatches);

// always keep specific routes first and parameterized routes later
router.get("/:id", protect, authorizeRoles("ADMIN", "MAKER"), getBatchById);

export default router;

