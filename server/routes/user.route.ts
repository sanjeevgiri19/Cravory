import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signUp,
  updateProfile,
  verifyEmail,
} from "../controller/user.controller";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.route("/check-auth").get(isAuthenticated, checkAuth);
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

router
  .route("/profile/update")
  .put(isAuthenticated, upload.single("profilePicture"), updateProfile);

export default router;
