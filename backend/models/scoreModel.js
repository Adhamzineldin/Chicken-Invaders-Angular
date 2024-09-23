const mongoose = require('mongoose');

const scoresSchema = new mongoose.Schema({
  name: String,
  score: Number,
  difficulty: String,
});

// Naming the model appropriately
const ScoreModel = mongoose.model('Score', scoresSchema, 'scores');

module.exports = ScoreModel;
