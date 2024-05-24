import { User } from "../models/User.js";

export const getAllUser = async () => {
  const user = await User.find({});
  console.log(user);
  return user;
};
