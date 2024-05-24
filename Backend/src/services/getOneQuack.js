import { Quack } from "../models/Quack.js";

export const getOneQuack = async (quackId) => {
  const quack = await Quack.findById(quackId).populate("userId");

  return quack;
};
