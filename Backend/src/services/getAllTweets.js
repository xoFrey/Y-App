import { Tweet } from "../models/Tweet.js";

export const getAllTweets = async () => {
  const tweets = await Tweet.find({});
  return tweets;
};
