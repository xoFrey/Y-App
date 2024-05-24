import { CommentService } from "../services/index.js";

const createCommentCtrl = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const newComment = {
      userId: req.body.userId,
      tweetId: req.params.tweetId,
      commentText: req.body.commentText,
      Date: Date.now(),
    };
    const result = await CommentService.createComment(tweetId, newComment);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

export const CommentController = { createCommentCtrl };
