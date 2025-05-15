import express from "express";
import authRoutes from "./routes/auth.route.js";
import locationRoutes from "./routes/location.route.js";
import { errorHandler } from "./middlewares/errors.js";
import cors from "cors";
import dotenv from "dotenv";
import { requestLogger } from "./middlewares/logger.js";
import passport from "passport";

import "./config/passport.js";
import session from "express-session";

const app = express();
app.use(express.json());
app.use(requestLogger);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
app.use("/api/location", locationRoutes);

app.use("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use(errorHandler);

export default app;
