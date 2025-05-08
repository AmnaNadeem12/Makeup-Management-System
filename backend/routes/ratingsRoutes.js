const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/RatingsController');

// POST /api/ratings
router.post('/ratings', ratingController.addRating);

module.exports = router;
