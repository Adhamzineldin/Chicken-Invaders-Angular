const express = require('express');
const router = express.Router();
const scoresController = require('../controllers/scoresController');

router.route('/').get(scoresController.getScores).post(scoresController.postScore);
router.route('/:difficulty').get(scoresController.getScoresByDifficulty);

module.exports = router;
