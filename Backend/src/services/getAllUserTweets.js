import { Tweet } from "../models/Tweet.js";

export const getAllUserTweets = async (userId) => {
  const tweets = await Tweet.find({ userId });
  return tweets;
};
