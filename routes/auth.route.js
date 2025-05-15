import express from "express";
import {
  register,
  login,
  getUser,
  forgotPassword,
  resetPassword,
} from "../controllers/index.js";
import { protect } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/get", protect, getUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
