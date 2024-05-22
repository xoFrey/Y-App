import { UserService } from "../services/index.js";

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
    const userInfo = {
      email: req.body.email,
      password: req.body.password,
    };
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

export const UserController = {
  registerUserCtrl,
  loginUserCtrl,
  verifyUserCtrl,
  sendVerificationMailCtrl,
};
