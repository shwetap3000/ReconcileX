import express from "express";
import {
  register,
  login,
  getMe,
  logout,
  changePassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/register", protect, authorizeRoles("ADMIN"), register);
router.post("/login", login);
router.post("/logout", protect, logout);

router.get("/me", protect, getMe);
router.get("/admin-test", protect, authorizeRoles("ADMIN"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});

router.patch("/change-password", protect, changePassword);

export default router;
