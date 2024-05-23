import { Tweet } from "../models/Tweet.js";

export const deleteTweet = async (tweetId) => {
  //* maybe validation only when userId === tweet.userId
  // * beim löschen auch kommentare zum tweet löschen
  const tweet = await Tweet.findByIdAndDelete(tweetId);
  if (!tweet) throw new Error("Tweet not found");
  return tweet;
};
