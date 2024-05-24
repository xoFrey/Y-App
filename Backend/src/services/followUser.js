import { User } from "../models/User.js";
import { userToView } from "./helpers.js";

export const followUser = async (userId, followingUserId) => {
  const userToFollow = await User.findById(followingUserId);
  if (followingUserId === userId) throw new Error("You cant follow yourself");
  const user = await User.findById(userId);
  if (user.following.includes(followingUserId))
    throw new Error("You are already following the person!");
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        following: followingUserId,
      },
    },
    { new: true },
  );

  return {
    user: userToView(updatedUser),
    following: {
      followingUser: userToView(userToFollow),
    },
  };
};
