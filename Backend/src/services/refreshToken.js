import { User } from "../models/User.js";
import { createToken } from "../utils/createToken.js";
import { userToView } from "./helpers.js";

export const refreshToken = async (authenticatedUserId) => {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User not found");

  const newAccessToken = createToken(user, "access");
  return { user: userToView(user), newAccessToken };
};
