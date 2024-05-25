import { UserService } from "../services/index.js";

const getAllUserCtrl = async (req, res) => {
  try {
    const result = await UserService.getAllUser();
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const registerUserCtrl = async (req, res) => {
  try {
    const userInfo = req.body;
    const result = await UserService.registerUser(userInfo);
    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const loginUserCtrl = async (req, res) => {
  try {
    const userInfo = req.body;
    const result = await UserService.loginUser(userInfo);
    if (result.tokens.refreshToken) {
      req.session.refreshToken = result.tokens.refreshToken;
    }
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const logoutUserCtrl = async (req, res) => {
  req.session.refreshToken = null;
  res.status(200).json({ result: { message: "you are now logged out" } });
};

const verifyUserCtrl = async (req, res) => {
  try {
    const userInfo = {
      userId: req.body.userId,
      sixDigitCode: req.body.sixDigitCode,
    };
    const result = await UserService.verifyUser(userInfo);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const sendVerificationMailCtrl = async (req, res) => {
  try {
    const userId = req.body.userId;
    const result = await UserService.sendVerificationMail(userId);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const followUserCtrl = async (req, res) => {
  try {
    const userId = req.body.userId;
    const followingUserId = req.params.followingUserId;
    const result = await UserService.followUser(userId, followingUserId);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const unfollowUserCtrl = async (req, res) => {
  try {
    const userId = req.body.userId;
    const unfollowUserId = req.params.unfollowUserId;
    const result = await UserService.unfollowUser(userId, unfollowUserId);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const refreshTokenCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUserId;
    const result = await UserService.refreshToken(authenticatedUserId);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

export const UserController = {
  registerUserCtrl,
  loginUserCtrl,
  verifyUserCtrl,
  sendVerificationMailCtrl,
  followUserCtrl,
  unfollowUserCtrl,
  refreshTokenCtrl,
  getAllUserCtrl,
  logoutUserCtrl,
};
