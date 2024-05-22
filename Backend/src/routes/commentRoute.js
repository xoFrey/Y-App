import express from "express";
import { CommentController } from "../controller/CommentController.js";

export const commentRoute = express
  .Router()
  //   .get("/", TweetController.getAllTweetsCtrl)
  //   .get("/:userId", TweetController.getAllUserTweetsCtrl)
  .post("/:tweetId", CommentController.createCommentCtrl);
//   .patch("/:tweetId", TweetController.updateTweetCtrl)
//   .delete("/:tweetId", TweetController.deleteTweetCtrl);
