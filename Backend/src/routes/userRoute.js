import express from "express";
import { UserController } from "../controller/UserController.js";
import { doJwtAuth, validateRefreshToken } from "../middlewares/doJwtAuth.js";

export const userRoute = express
  .Router()
  .post("/register", UserController.registerUserCtrl)
  .post("/login", UserController.loginUserCtrl)
  .post("/verifyUser", doJwtAuth, UserController.verifyUserCtrl)
  .post(
    "/sendEmailVerification",
    doJwtAuth,
    UserController.sendVerificationMailCtrl,
  )
  .post("/refresh-token", validateRefreshToken, UserController.refreshTokenCtrl)
  .patch("/follow/:followingUserId", UserController.followUserCtrl)
  .patch("/unfollow/:unfollowUserId", UserController.unfollowUserCtrl);
