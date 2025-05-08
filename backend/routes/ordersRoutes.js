
const express = require('express');
const router = express.Router();
const { placeOrder, cancelOrder, trackOrder, updateOrder } = require('../controllers/ordersController');

router.post('/place', placeOrder);
router.post('/cancel', cancelOrder);
router.post('/track', trackOrder); 

router.post('/update', updateOrder);
module.exports = router;
