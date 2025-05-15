import {
  registerUserService,
  loginUserService,
  getUserService,
} from "../services/authService.js";

/**
 * Controller to register a new user.
 */
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const data = await registerUserService({ username, email, password });
    res.status(201).json(data);
  } catch (err) {
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
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

/**
 * Controller to get the currently authenticated user's info.
 */
export const getUser = async (req, res) => {
  try {
    const data = await getUserService(req.user.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: "User not found", error: err.message });
  }
};
