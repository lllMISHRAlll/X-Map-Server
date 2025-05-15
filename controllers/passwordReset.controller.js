import {
  forgotPasswordService,
  resetPasswordService,
} from "../services/index.js";

/**
 * Handles forgot password request.
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const message = await forgotPasswordService(email);
    res.status(200).json({ message });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send reset link", error: err.message });
  }
};

/**
 * Handles resetting the password with a token.
 */
export const resetPassword = async (req, res) => {
  try {
    console.log("reset pwd", req.body);
    const { token, newPassword } = req.body;
    const message = await resetPasswordService(token, newPassword);
    res.status(200).json({ message });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Password reset failed", error: err.message });
  }
};
