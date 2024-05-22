import express from "express";
import { UserController } from "../controller/UserController.js";

export const userRoute = express
  .Router()
  .post("/register", UserController.registerUserCtrl)
  .post("/login", UserController.loginUserCtrl);
