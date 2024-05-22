import { Tweet } from "../models/Tweet.js";

export const updateTweet = async (tweetId, updateInfo) => {
  //* maybe validation only when userId === tweet.userId
  const tweet = await Tweet.findByIdAndUpdate(
    tweetId,
    { $set: updateInfo },
    { new: true },
  );
  if (!tweet) throw new Error("Tweet not found");
  return tweet;
};
