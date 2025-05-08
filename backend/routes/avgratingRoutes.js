const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/avgratingController');

// GET average ratings of all products
router.get('/average', ratingController.getProductAverageRatings);

module.exports = router;
