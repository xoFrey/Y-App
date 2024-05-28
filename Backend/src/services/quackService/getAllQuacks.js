import { Quack } from "../../models/Quack.js";
import { User } from "../../models/User.js";

export const getAllQuacks = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const quacks = await Quack.find({
    userId: { $in: [...user.following, userId] },
  })
    .populate({
      path: "userId",
      select: "_id firstname lastname username imgUrl",
    })
    .sort({ createdAt: -1 });

  return quacks;
};
