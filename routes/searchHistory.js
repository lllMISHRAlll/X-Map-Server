import express from "express";
import {
  saveSearch,
  getSearchHistory,
  deleteSearch,
} from "../controllers/searchHistory.js";
import { protect } from "../middlewares/verifyToken.js";

const router = express.Router();

router.use(protect);
router.post("/save", saveSearch);
router.get("/get", getSearchHistory);
router.delete("/delete/:id", deleteSearch);

export default router;
