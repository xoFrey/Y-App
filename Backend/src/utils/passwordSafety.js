import crypto from "crypto";

export const hash = (inputString) => {
  return crypto.createHash("sha512").update(inputString).digest("hex");
};

export const generateRandomSalt = () => {
  return crypto.randomBytes(64).toString("hex");
};

export const generateSixDigitCode = () => {
  return Math.random().toString().slice(2, 8);
};
