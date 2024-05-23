import { User } from "../models/User.js";
import { createToken } from "../utils/createToken.js";
import { hash } from "../utils/passwordSafety.js";
import { userToView } from "./helpers.js";

export const loginUser = async ({ email, password }) => {
  console.log(email);
  console.log(password);
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const passwordHash = hash(`${password}${user.passwordSalt}`);
  if (!passwordHash === user.passwordHash) throw new Error("Wrong password");

  const accessToken = createToken(user, "access");
  //   const refreshToken = createToken(user, "refresh");

  return { user: userToView(user), tokens: { accessToken } };
};
