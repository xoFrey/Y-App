import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    tweetText: { type: String, required: true, trim: true },
    Date: { type: Date, required: true },
    comments: [
      {
        commentId: { type: mongoose.Types.ObjectId, ref: "Comments" },
        commentText: { type: String, trim: true },
      },
    ],
  },
  { collection: "tweets" },
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
