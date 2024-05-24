import { Quack } from "../models/Quack.js";

export const getAllUserQuacks = async (userId) => {
  const quacks = await Quack.find({ userId }).populate("userId");
  return quacks;
};
