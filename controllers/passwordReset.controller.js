import {
  forgotPasswordService,
  resetPasswordService,
} from "../services/index.js";

import logger from "../config/logger.js";

/**
 * Handles forgot password request.
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const message = await forgotPasswordService(email);
    logger.info(`Password reset link sent to: ${email}`);
    res.status(200).json({ message });
  } catch (err) {
    logger.error(
      `Failed to send reset link to ${req.body.email}: ${err.message}`
    );
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
    const { token, newPassword } = req.body;
    logger.info(
      `Password reset attempt with token: ${token.substring(0, 6)}...`
    );
    const message = await resetPasswordService(token, newPassword);
    logger.info(
      `Password reset successful for token: ${token.substring(0, 6)}...`
    );
    res.status(200).json({ message });
  } catch (err) {
    logger.error(
      `Password reset failed for token: ${req.body.token?.substring(
        0,
        6
      )}... Error: ${err.message}`
    );
    res
      .status(500)
      .json({ message: "Password reset failed", error: err.message });
  }
};
