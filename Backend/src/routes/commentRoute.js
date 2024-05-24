import express from "express";
import { CommentController } from "../controller/CommentController.js";

export const commentRoute = express
  .Router()
  .post("/:quackId", CommentController.createCommentCtrl);
