const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/RecommendationController');

// Route: Get product recommendations for a user
router.get('/:userId', getRecommendations);  // Dynamic route using :userId

module.exports = router;