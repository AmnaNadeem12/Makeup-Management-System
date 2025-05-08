const express = require('express');
const router = express.Router();
const { getLowStockProducts } = require('../controllers/lowstockController');

router.get('/', getLowStockProducts);

module.exports = router;
