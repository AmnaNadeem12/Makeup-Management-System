const express = require('express');
const router = express.Router();
const { addToWishlist, viewWishlist } = require('../controllers/wishlistController');  // Adjust path if needed

// Route to add product to wishlist
router.post('/add', addToWishlist);

// Route to view user's wishlist
router.get('/:user_id', viewWishlist);

module.exports = router;
