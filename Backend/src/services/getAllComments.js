import { Comments } from "../models/Comments.js";
import { User } from "../models/User.js";

export const getAllComments = async (quackId) => {
  const comments = await Comments.find({ quackId: quackId }).populate("userId");

  return comments;
};
