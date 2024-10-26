const Score = require('../models/scoreModel');

const getScores = async (req, res) => {
  try {
    const scores = await Score.find();
    res.json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const getScoresByDifficulty = async (req, res) => {
  try {
    const {difficulty} = req.params;
    const scores = await Score.find({difficulty});
    const orderedScores = scores.sort((a, b) => b.score - a.score);
    res.json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  }
};


const postScore = async (req, res) => {
  try {
    const {name, score, difficulty} = req.body;

    if (typeof name !== 'string' || typeof score !== 'number' || typeof difficulty !== 'string') {
      return res.status(400).json({message: 'Invalid input data'});
    }

    const newScore = new Score({name, score, difficulty});
    await newScore.save();
    res.status(201).json(newScore);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  }
};

module.exports = {
  getScores,
  postScore,
  getScoresByDifficulty
};
