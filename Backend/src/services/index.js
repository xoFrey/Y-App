import { createComment } from "./createComment.js";
import { createQuack } from "./createQuack.js";
import { deleteQuack } from "./deleteQuack.js";
import { editProfile } from "./editProfile.js";
import { followUser } from "./followUser.js";
import { getAllComments } from "./getAllComments.js";
import { getAllQuacks } from "./getAllQuacks.js";
import { getAllUser } from "./getAllUser.js";
import { getAllUserQuacks } from "./getAllUserQuacks.js";
import { getOneQuack } from "./getOneQuack.js";
import { getOneUser } from "./getOneUser.js";
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
