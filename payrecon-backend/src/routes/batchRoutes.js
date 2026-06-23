import express from "express";
import { createBatch, getBatches } from "../controllers/batchController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("MAKER", "ADMIN"), createBatch);
router.get("/", protect, authorizeRoles("ADMIN", "MAKER"), getBatches);

export default router;
