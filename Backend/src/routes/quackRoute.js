import express from "express";

import { QuackController } from "../controller/QuackController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const quackRoute = express
  .Router()
  .get("/", QuackController.getAllQuacksCtrl)
  .get("/user/:userId", QuackController.getAllUserQuacksCtrl)
  .get("/:quackId", QuackController.getOneQuackCtrl)
  .post("/", doJwtAuth, QuackController.createQuackCtrl)
  .patch("/:quackId", QuackController.updateQuackCtrl)
  .delete("/:quackId", QuackController.deleteQuackCtrl);
