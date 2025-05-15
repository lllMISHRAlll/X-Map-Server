import crypto from "crypto";
import { User, PasswordReset } from "../models/index.js";
import sendEmail from "../utils/sendEmail.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Initiates the forgot password flow.
 */
export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });
  console.log("user", user);
  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 mins

    await PasswordReset.create({
      userId: user._id,
      token,
      expiresAt,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    console.log("rest", resetLink);

    await sendEmail({
      to: user.email,
      subject: `Password Reset - ${user.username}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 15 minutes.</p>`,
    });
  }

  return "If this email exists, a reset link has been sent.";
};

/**
 * Completes the password reset.
 */
export const resetPasswordService = async (token, newPassword) => {
  const resetToken = await PasswordReset.findOne({ token });

  if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
    throw new Error("Invalid or expired token");
  }

  const user = await User.findById(resetToken.userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.password = newPassword;
  await user.save();

  resetToken.used = true;
  await resetToken.save();

  return "Password reset successful";
};
