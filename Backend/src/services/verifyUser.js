import { User } from "../models/User.js";

export const verifyUser = async ({ userId, sixDigitCode }) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (sixDigitCode !== user.sixDigitCode) throw new Error("Code is wrong");
  user.isVerified = true;
  await user.save();

  return { message: "User now verified " };
};
