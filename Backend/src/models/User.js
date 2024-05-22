import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    bio: {
      type: String,
      default: "Hi, I am now using Y-App. Its better than X.",
    },
    passwordHash: { type: String, required: true, trim: true },
    passwordSalt: { type: String, required: true, trim: true },
    isVerified: { type: Boolean, default: false },
    sixDigitCode: { type: String, required: true },
    tweets: [{ type: mongoose.Types.ObjectId, ref: "Tweets" }],
    follows: [
      {
        userId: { type: mongoose.Types.ObjectId, ref: "User" },
        userTweet: { type: String, trim: true },
      },
    ],
  },
  { collection: "users" },
);

export const User = mongoose.model("User", userSchema);
