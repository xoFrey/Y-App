import { User } from "../models/User.js";
import {
  generateRandomSalt,
  generateSixDigitCode,
  hash,
} from "../utils/passwordSafety.js";
import { userToView } from "./helpers.js";

export const registerUser = async ({
  firstname,
  lastname,
  username,
  email,
  password,
}) => {
  const user = await User.findOne({ $or: [{ email }, { username }] });
  console.log(user);
  if (user) throw new Error("User with this Email or Username already exists");

  const passwordSalt = generateRandomSalt();
  const passwordHash = hash(`${password}${passwordSalt}`);
  const sixDigitCode = generateSixDigitCode();

  const newUser = await User.create({
    firstname,
    lastname,
    email,
    username,
    passwordHash,
    passwordSalt,
    sixDigitCode,
    isVerified: false,
  });

  return userToView(newUser);
};
