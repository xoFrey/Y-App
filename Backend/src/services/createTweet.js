import { Tweet } from "../models/Tweet.js";
import { User } from "../models/User.js";
import { userToView } from "./helpers.js";
// userId, tweetText, Date, comments []

export const createTweet = async (userId, newTweet) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const createdTweet = await Tweet.create(newTweet);

  user.tweets.push(createdTweet);
  await user.save();
  return { user: userToView(user), createdTweet };
};
