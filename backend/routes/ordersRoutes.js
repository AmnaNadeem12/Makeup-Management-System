
const express = require('express');
const router = express.Router();
const { placeOrder, cancelOrder, trackOrder } = require('../controllers/ordersController');

router.post('/place', placeOrder);
router.post('/cancel', cancelOrder);
router.post('/track', trackOrder); // ✅ This line is important!

module.exports = router;
