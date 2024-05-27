import { Comments } from "../../models/Comments.js";
import { Quack } from "../../models/Quack.js";
import { User } from "../../models/User.js";
import { userToView } from "../helpers.js";

export const createComment = async (quackId, newComment) => {
  const quack = await Quack.findById(quackId);
  if (!quack) throw new Error("Quack not found");
  const user = await User.findById(quack.userId);

  const createdComment = await Comments.create(newComment);

  return { createdComment, user: userToView(user) };
};
