import { CommentService } from "../services/index.js";

const getAllCommentsCtrl = async (req, res) => {
  try {
    const quackId = req.params.quackId;
    const result = await CommentService.getAllComments(quackId);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const createCommentCtrl = async (req, res) => {
  try {
    const quackId = req.params.quackId;
    const newComment = {
      userId: req.body.userId,
      quackId: req.params.quackId,
      commentText: req.body.commentText,
      Date: Date.now(),
    };
    const result = await CommentService.createComment(quackId, newComment);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

export const CommentController = { createCommentCtrl, getAllCommentsCtrl };
