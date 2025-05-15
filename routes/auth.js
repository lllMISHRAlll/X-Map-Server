import express from "express";
import { register, login, getUser } from "../controllers/auth.js";
import { protect } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/get", protect, getUser);

export default router;
