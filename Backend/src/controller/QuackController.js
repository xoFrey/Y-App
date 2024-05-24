import { QuackService } from "../services/index.js";

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
    const result = await QuackService.getAllQuacks();
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const createQuackCtrl = async (req, res) => {
  try {
    const userId = req.body.userId;
    const newQuack = {
      userId: req.body.userId,
      quackText: req.body.quackText,
      Date: Date.now(),
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
};
