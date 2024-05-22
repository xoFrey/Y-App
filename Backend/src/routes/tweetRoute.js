import express from "express";

import { TweetController } from "../controller/TweetController.js";

export const tweetRoute = express
  .Router()
  .get("/", TweetController.getAllTweetsCtrl)
  .get("/:userId", TweetController.getAllUserTweetsCtrl)
  .post("/", TweetController.createTweetCtrl)
  .patch("/:tweetId", TweetController.updateTweetCtrl)
  .delete("/:tweetId", TweetController.deleteTweetCtrl);
