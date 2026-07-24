import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import profileUpload from "../middleware/profileUpload.js";

import {
  updateProfile,
  uploadProfilePicture,
} from "../controllers/profileController.js";


const router = express.Router();

router.patch("/", protect, updateProfile);

router.post(
  "/picture",
  protect,
  profileUpload.single("profilePicture"),
  uploadProfilePicture,
);

export default router;
