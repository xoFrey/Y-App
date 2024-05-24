import { Quack } from "../models/Quack.js";

export const updateQuack = async (quackId, updateInfo) => {
  //* maybe validation only when userId === quack.userId
  const quack = await Quack.findByIdAndUpdate(
    quackId,
    { $set: updateInfo },
    { new: true },
  );
  if (!quack) throw new Error("Quack not found");
  return quack;
};
