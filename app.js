import express from "express";
import authRoutes from "./routes/auth.js";
import searchRoutes from "./routes/searchHistory.js";
import { errorHandler } from "./middlewares/errors.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("CORS blocked:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

app.use("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use(errorHandler);

export default app;
