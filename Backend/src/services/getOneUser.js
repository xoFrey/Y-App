import { User } from "../models/User.js";
import { userToView } from "./helpers.js";

export const getOneUser = async (userId) => {
  const user = await User.findById(userId);
  return userToView(user);
};
