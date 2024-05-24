import { User } from "../models/User.js";
import { userToView } from "./helpers.js";

export const getAllUser = async () => {
  const allUser = await User.find({});
  const user = allUser.map((singleUser) => userToView(singleUser));
  return user;
};
