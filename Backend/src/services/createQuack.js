import { Quack } from "../models/Quack.js";
import { User } from "../models/User.js";
import { userToView } from "./helpers.js";
// userId, quackText, Date, comments []

export const createQuack = async (userId, newQuack) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const createdQuack = await Quack.create(newQuack);

  user.quacks.push(createdQuack);
  await user.save();
  return { user: userToView(user), createdQuack };
};
