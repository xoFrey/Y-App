import { User } from "../models/User.js";

export const editProfile = async (userId, updateInfo) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (!user.isVerified) throw new Error("User is not verified!");

  const updatedUser = User.findByIdAndUpdate(
    userId,
    { $set: updateInfo },
    { new: true },
  );

  return updatedUser;
};
