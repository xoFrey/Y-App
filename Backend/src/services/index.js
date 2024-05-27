import { createComment } from "./commentService/createComment.js";
import { createQuack } from "./quackService/createQuack.js";
import { deleteQuack } from "./quackService/deleteQuack.js";
import { editProfile } from "./userService/editProfile.js";
import { followUser } from "./userService/followUser.js";
import { getAllComments } from "./commentService/getAllComments.js";
import { getAllQuacks } from "./quackService/getAllQuacks.js";
import { getAllUser } from "./userService/getAllUser.js";
import { getAllUserQuacks } from "./quackService/getAllUserQuacks.js";
import { getOneQuack } from "./quackService/getOneQuack.js";
import { getOneUser } from "./userService/getOneUser.js";
import { loginUser } from "./userService/loginUser.js";
import { refreshToken } from "./refreshToken.js";
import { registerUser } from "./userService/registerUser.js";
import { sendVerificationMail } from "./sendVerificationMail.js";
import { unfollowUser } from "./userService/unfollowUser.js";
import { updateQuack } from "./quackService/updateQuack.js";
import { verifyUser } from "./userService/verifyUser.js";

export const UserService = {
  registerUser,
  loginUser,
  verifyUser,
  sendVerificationMail,
  followUser,
  unfollowUser,
  refreshToken,
  getAllUser,
  getOneUser,
  editProfile,
};

export const QuackService = {
  createQuack,
  updateQuack,
  deleteQuack,
  getAllUserQuacks,
  getAllQuacks,
  getOneQuack,
};

export const CommentService = {
  createComment,
  getAllComments,
};
