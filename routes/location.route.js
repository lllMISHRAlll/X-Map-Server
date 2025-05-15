import express from "express";
import {
  saveLocation,
  getLocation,
  deleteLocation,
} from "../controllers/index.js";
import { protect } from "../middlewares/verifyToken.js";

const router = express.Router();

router.use(protect);
router.post("/save", saveLocation);
router.get("/get", getLocation);
router.delete("/delete/:id", deleteLocation);

export default router;
