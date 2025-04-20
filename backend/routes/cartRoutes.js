const express = require('express');
const router = express.Router();

const { getCartItems, addToCart, removeFromCart } = require('../controllers/cartController');

// Route to view all cart items
router.get('/', getCartItems);

// Route to add an item to the cart
router.post('/', addToCart);

// Route to remove item from cart
router.delete('/remove', removeFromCart);

module.exports = router;
