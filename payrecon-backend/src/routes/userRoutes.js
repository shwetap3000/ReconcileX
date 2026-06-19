import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("ADMIN"), getAllUsers);

export default router;
