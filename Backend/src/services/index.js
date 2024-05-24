import { createComment } from "./createComment.js";
import { createQuack } from "./createQuack.js";
import { deleteQuack } from "./deleteQuack.js";
import { followUser } from "./followUser.js";
import { getAllQuacks } from "./getAllQuacks.js";
import { getAllUser } from "./getAllUser.js";
import { getAllUserQuacks } from "./getAllUserQuacks.js";
import { loginUser } from "./loginUser.js";
import { refreshToken } from "./refreshToken.js";
import { registerUser } from "./registerUser.js";
import { sendVerificationMail } from "./sendVerificationMail.js";
import { unfollowUser } from "./unfollowUser.js";
import { updateQuack } from "./updateQuack.js";
import { verifyUser } from "./verifyUser.js";

export const UserService = {
  registerUser,
  loginUser,
  verifyUser,
  sendVerificationMail,
  followUser,
  unfollowUser,
  refreshToken,
  getAllUser,
};

export const QuackService = {
  createQuack,
  updateQuack,
  deleteQuack,
  getAllUserQuacks,
  getAllQuacks,
};

export const CommentService = {
  createComment,
};
