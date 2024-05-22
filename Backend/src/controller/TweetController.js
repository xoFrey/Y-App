import { TweetService, UserService } from "../services/index.js";

const getAllUserTweetsCtrl = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await TweetService.getAllUserTweets(userId);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const getAllTweetsCtrl = async (req, res) => {
  try {
    const result = await TweetService.getAllTweets();
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const createTweetCtrl = async (req, res) => {
  try {
    const userId = req.body.userId;
    const newTweet = {
      userId: req.body.userId,
      tweetText: req.body.tweetText,
      Date: Date.now(),
    };
    const result = await TweetService.createTweet(userId, newTweet);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const updateTweetCtrl = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const updateInfo = req.body;
    const result = await TweetService.updateTweet(tweetId, updateInfo);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const deleteTweetCtrl = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const result = await TweetService.deleteTweet(tweetId);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

export const TweetController = {
  createTweetCtrl,
  updateTweetCtrl,
  deleteTweetCtrl,
  getAllUserTweetsCtrl,
  getAllTweetsCtrl,
};
