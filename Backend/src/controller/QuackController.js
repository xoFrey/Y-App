import { QuackService } from "../services/index.js";

const getOneQuackCtrl = async (req, res) => {
  try {
    const quackId = req.params.quackId;
    const result = await QuackService.getOneQuack(quackId);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const getAllUserQuacksCtrl = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await QuackService.getAllUserQuacks(userId);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const getAllQuacksCtrl = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await QuackService.getAllQuacks(userId);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const createQuackCtrl = async (req, res) => {
  try {
    const userId = req.body.userId;
    const date = new Date(Date.now());
    const newQuack = {
      userId: req.body.userId,
      quackText: req.body.quackText,
      Date: date.toLocaleString(),
    };
    const result = await QuackService.createQuack(userId, newQuack);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const updateQuackCtrl = async (req, res) => {
  try {
    const quackId = req.params.quackId;
    const updateInfo = req.body;
    const result = await QuackService.updateQuack(quackId, updateInfo);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const deleteQuackCtrl = async (req, res) => {
  try {
    const quackId = req.params.quackId;
    const result = await QuackService.deleteQuack(quackId);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

export const QuackController = {
  createQuackCtrl,
  updateQuackCtrl,
  deleteQuackCtrl,
  getAllUserQuacksCtrl,
  getAllQuacksCtrl,
  getOneQuackCtrl,
};
