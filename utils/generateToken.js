import jwt from "jsonwebtoken";

/**
 * Generate JWT token using user ID.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export default generateToken;
