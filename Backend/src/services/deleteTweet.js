import { Tweet } from "../models/Tweet.js";

export const deleteTweet = async (tweetId) => {
  //* maybe validation only when userId === tweet.userId
  const tweet = await Tweet.findByIdAndDelete(tweetId);
  if (!tweet) throw new Error("Tweet not found");
  return tweet;
};
