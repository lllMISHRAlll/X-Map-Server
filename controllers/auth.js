import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  const token = generateToken(user._id);
  res.status(201).json({
    token: token,
    user: {
      username: user.username,
      email: user.email,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user._id);
  res.json({
    token: token,
    user: {
      username: user.username,
      email: user.email,
    },
  });
};
