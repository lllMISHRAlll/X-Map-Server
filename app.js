import express from "express";
import authRoutes from "./routes/auth.js";
import searchRoutes from "./routes/searchHistory.js";
import { errorHandler } from "./middlewares/errors.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

app.use("/health", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use(errorHandler);

export default app;
