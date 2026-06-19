import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUserRole,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("ADMIN"), getAllUsers);
router.get("/:id", protect, authorizeRoles("ADMIN"), getUserById);
router.patch("/:id/role", protect, authorizeRoles("ADMIN"), updateUserRole);

export default router;
