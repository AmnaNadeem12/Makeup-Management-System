const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductsByPriceRange,
  getTopRatedProducts,
  getTopRatedByCategory,
  getProductsWithPromotions,
  getProductRatingsAndReviews,
  getStockAlerts,
  getProductRecommendations
} = require('../controllers/productController');
// Personalized recommendations for a user
router.get('/recommendations/:userId', getProductRecommendations);

// 🔽 Specific GET routes should be defined BEFORE generic ones
// Stock alerts route
router.get('/alerts/stock', getStockAlerts);

// Get product promotions
router.get('/promotions', getProductsWithPromotions);

// Get product ratings and reviews
router.get('/reviews', getProductRatingsAndReviews);

// Price filtering route
router.get('/filter/price', getProductsByPriceRange);

// Top-rated products (overall)
router.get('/top-rated', getTopRatedProducts);

// Top-rated products by category
router.get('/top-rated/:category', getTopRatedByCategory);

// Get a product by ID 
router.get('/:id', getProductById);

// General product routes
router.get('/', getAllProducts);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
