import { User } from "../models/User.js";
import { userToView } from "./helpers.js";

export const unfollowUser = async (userId, unfollowUserId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { following: unfollowUserId } },
    { new: true },
  );

  return {
    user: userToView(user),
    follow: user.following,
  };
};
