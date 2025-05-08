const express = require('express');
const router = express.Router();
const { getAllDeals } = require('../controllers/dealsController');


router.get('/deals', getAllDeals);

module.exports = router;