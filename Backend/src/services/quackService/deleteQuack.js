import { Comments } from "../../models/Comments.js";
import { Quack } from "../../models/Quack.js";

export const deleteQuack = async (quackId) => {
  //* maybe validation only when userId === quack.userId
  // * beim löschen auch kommentare zum quack löschen
  const commentsToQuack = await Comments.deleteMany({ quackId: quackId });
  const quack = await Quack.findByIdAndDelete(quackId);
  if (!quack) throw new Error("Quack not found");

  return { quack, commentsToQuack };
};
