import { Comments } from "../models/Comments.js";
import { Tweet } from "../models/Tweet.js";

export const createComment = async (tweetId, newComment) => {
  const tweet = await Tweet.findByIdAndUpdate(tweetId);
  if (!tweet) throw new Error("Tweet not found");

  const createdComment = await Comments.create(newComment);
  //   * vielleicht nicht comment id sondern text dirent => einfacher frontend
  tweet.comments.push({
    id: createdComment._id,
    commentText: createdComment.commentText,
  });
  await tweet.save();
  return { ...tweet.toObject(), createdComment };
};
