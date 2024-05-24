import { Comments } from "../models/Comments.js";
import { Quack } from "../models/Quack.js";
import { User } from "../models/User.js";
import { userToView } from "./helpers.js";

export const createComment = async (quackId, newComment) => {
  const quack = await Quack.findById(quackId);
  if (!quack) throw new Error("Quack not found");

  const createdComment = await Comments.create(newComment);
  const commentingUser = await User.findById(newComment.userId);

  return {
    ...quack.toObject(),
    user: userToView(commentingUser),
    createdComment,
  };
};
