import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const createToken = (user, type = "access") => {
  const tokenPayload = {
    sub: user._id,
    type: type,
    iat: Math.ceil(Date.now() / 1000),
  };

  const expiresIn = { access: "10min", refresh: "2M" }[type];
  const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn });

  return token;
};
