const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { body, validationResult } = require('express-validator');

  //add rating
router.post('/ratings',
    [
      body('userid').isInt().withMessage('User ID must be an integer'),
      body('product_id').isInt().withMessage('Product ID must be an integer'),
      body('rating').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
      body('review').isLength({ min: 3 }).withMessage('Review should be at least 3 characters')
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    ratingController.addRating
  );
  //update rating
  router.put('/ratings',
    [
      body('userid').isInt().withMessage('User ID must be an integer'),
      body('product_id').isInt().withMessage('Product ID must be an integer'),
      body('rating').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
      body('review').isLength({ min: 3 }).withMessage('Review should be at least 3 characters')
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    ratingController.updateProductRating
  );


// add rating
router.post('/ratings', ratingController.addRating);
router.get('/averageratings', ratingController.getAverageProductRatings);
router.get('/ratings/:productId', ratingController.getRatingsByProduct);
router.put('/updaterating', ratingController.updateProductRating);
router.get('/productratings', ratingController.getProductRatingsAndReviews);

//recommendation
router.get('/recommendations/:user_id', ratingController.getRecommendations);

//discounted prices
router.get('/discountedprices', ratingController.getDiscountedPrices);

// promotions
router.get('/product-promotions', ratingController.getProductPromotions)
module.exports = router;
