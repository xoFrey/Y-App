import { Comments } from "../models/Comments.js";
import { Tweet } from "../models/Tweet.js";
import { User } from "../models/User.js";
import { userToView } from "./helpers.js";

export const createComment = async (tweetId, newComment) => {
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) throw new Error("Tweet not found");

  const createdComment = await Comments.create(newComment);
  const commentingUser = await User.findById(newComment.userId);

  return {
    ...tweet.toObject(),
    user: userToView(commentingUser),
    createdComment,
  };
};
