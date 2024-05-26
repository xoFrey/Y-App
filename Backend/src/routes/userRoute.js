import express from "express";
import { UserController } from "../controller/UserController.js";
import { doJwtAuth, validateRefreshToken } from "../middlewares/doJwtAuth.js";

export const userRoute = express
  .Router()
  .get("/", UserController.getAllUserCtrl)
  .get("/:userId", UserController.getOneUserCtrl)
  .post("/register", UserController.registerUserCtrl)
  .post("/login", UserController.loginUserCtrl)
  .post("/logout", UserController.logoutUserCtrl)
  .post("/verifyUser", doJwtAuth, UserController.verifyUserCtrl)
  .post(
    "/sendEmailVerification",
    doJwtAuth,
    UserController.sendVerificationMailCtrl,
  )
  .post("/refresh-token", validateRefreshToken, UserController.refreshTokenCtrl)
  .patch("/:userId", doJwtAuth, UserController.editProfileCtrl)
  .patch("/follow/:followingUserId", UserController.followUserCtrl)
  .patch("/unfollow/:unfollowUserId", UserController.unfollowUserCtrl);
