import { User } from "../models/User.js";
import { userToView } from "./helpers.js";

export const unfollowUser = async (userId, unfollowUserId) => {
  const userToUnfollow = await User.findById(unfollowUserId);
  if (unfollowUserId === userId) throw new Error("You cant unfollow yourself");

  const user = await User.findById(userId);
  if (!user.following.includes(unfollowUserId))
    throw new Error("You dont follow this person!");

  const userUpdate = await User.findByIdAndUpdate(
    userId,
    { $pull: { following: unfollowUserId } },
    { new: true },
  );

  return {
    user: userToView(userUpdate),
    follow: user.following,
  };
};
