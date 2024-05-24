import { Quack } from "../models/Quack.js";

export const getAllQuacks = async () => {
  const quacks = await Quack.find({});
  return quacks;
};
