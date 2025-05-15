import { User } from "../models/index.js";
import generateToken from "../utils/generateToken.js";

/**
 * Register a new user.
 */
export const registerUserService = async ({ username, email, password }) => {
  const user = await User.create({ username, email, password });
  const token = generateToken(user._id);

  return {
    token,
    user: {
      username: user.username,
      email: user.email,
    },
  };
};

/**
 * Login an existing user.
 */
export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return null;
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      username: user.username,
      email: user.email,
    },
  };
};

/**
 * Get the authenticated user's details.
 */
export const getUserService = async (userId) => {
  const user = await User.findById(userId).select("username email");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  };
};
