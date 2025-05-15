import express from "express";
import {
  register,
  login,
  getUser,
  forgotPassword,
  resetPassword,
} from "../controllers/index.js";
import { protect } from "../middlewares/verifyToken.js";
import "../config/passport.js";

import dotenv from "dotenv";
import passport from "passport";
import generateToken from "../utils/generateToken.js";
dotenv.config();

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/get", protect, getUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  }
);

export default router;
