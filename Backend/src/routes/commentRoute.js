import express from "express";
import { CommentController } from "../controller/CommentController.js";

export const commentRoute = express
  .Router()
  .get("/:quackId", CommentController.getAllCommentsCtrl)
  .post("/:quackId", CommentController.createCommentCtrl);
