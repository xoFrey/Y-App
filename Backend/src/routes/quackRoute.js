import express from "express";

import { QuackController } from "../controller/QuackController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const quackRoute = express
  .Router()
  .get("/", QuackController.getAllQuacksCtrl)
  .get("/:userId", QuackController.getAllUserQuacksCtrl)
  .post("/", doJwtAuth, QuackController.createQuackCtrl)
  .patch("/:quackId", QuackController.updateQuackCtrl)
  .delete("/:quackId", QuackController.deleteQuackCtrl);
