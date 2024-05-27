import { Comments } from "../../models/Comments.js";

export const getAllComments = async (quackId) => {
  const comments = await Comments.find({ quackId: quackId }).populate("userId");

  return comments;
};
