import { createComment } from "./createComment.js";
import { createTweet } from "./createTweet.js";
import { deleteTweet } from "./deleteTweet.js";
import { followUser } from "./followUser.js";
import { getAllTweets } from "./getAllTweets.js";
import { getAllUserTweets } from "./getAllUserTweets.js";
import { loginUser } from "./loginUser.js";
import { registerUser } from "./registerUser.js";
import { sendVerificationMail } from "./sendVerificationMail.js";
import { unfollowUser } from "./unfollowUser.js";
import { updateTweet } from "./updateTweet.js";
import { verifyUser } from "./verifyUser.js";

export const UserService = {
  registerUser,
  loginUser,
  verifyUser,
  sendVerificationMail,
  followUser,
  unfollowUser,
};

export const TweetService = {
  createTweet,
  updateTweet,
  deleteTweet,
  getAllUserTweets,
  getAllTweets,
};

export const CommentService = {
  createComment,
};
