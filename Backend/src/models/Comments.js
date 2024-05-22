import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    commentText: { type: String, required: true, trim: true },
    Date: { type: Date, required: true },
  },
  { collection: "comments" },
);

export const Comments = mongoose.model("Comments", commentSchema);
