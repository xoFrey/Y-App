import mongoose from "mongoose";

const quackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    quackText: { type: String, required: true, trim: true },
    Date: { type: Date, required: true },
  },
  { collection: "quacks" },
);

export const Quack = mongoose.model("Quack", quackSchema);
