import express from "express";
import { CommentController } from "../controller/CommentController.js";
import { QuackController } from "../controller/QuackController.js";

export const commentRoute = express
  .Router()
  .get("/", QuackController.getAllQuacksCtrl)
  .get("/:userId", QuackController.getAllUserQuacksCtrl)
  .post("/:quackId", CommentController.createCommentCtrl);
//   .patch("/:quackId", QuackController.updateQuackCtrl)
//   .delete("/:quackId", QuackController.deleteQuackCtrl);
