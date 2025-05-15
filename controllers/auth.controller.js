import {
  registerUserService,
  loginUserService,
  getUserService,
} from "../services/index.js";

import logger from "../config/logger.js";

/**
 * Controller to register a new user.
 */
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const data = await registerUserService({ username, email, password });
    logger.info(`User registered: ${email}`);
    res.status(201).json(data);
  } catch (err) {
    logger.error(
      `Registration failed for email ${req.body.email}: ${err.message}`
    );
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

/**
 * Controller to authenticate and log in a user.
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUserService({ email, password });

    if (!data) {
      logger.warn(`Login failed: Invalid credentials for email ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    logger.info(`User logged in: ${email}`);
    res.status(200).json(data);
  } catch (err) {
    logger.error(`Login error for email ${req.body.email}: ${err.message}`);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

/**
 * Controller to get the currently authenticated user's info.
 */
export const getUser = async (req, res) => {
  try {
    const data = await getUserService(req.user.id);
    console.log("data", data);
    logger.info(`User info retrieved: ID ${req.user.id}`);
    res.status(200).json(data);
  } catch (err) {
    logger.error(`User not found: ID ${req.user.id} - ${err.message}`);
    res.status(404).json({ message: "User not found", error: err.message });
  }
};
