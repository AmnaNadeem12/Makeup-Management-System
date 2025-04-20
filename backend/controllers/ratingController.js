const Rating = require('../models/ratingModel');
const { sql, poolPromise } = require('../config/db');

  // Add Rating to Product
  exports.addRating = async (req, res) => {
    const { userid, product_id, rating, review } = req.body;
  
    try {
      const pool = await poolPromise;
      
      const result = await pool.request()
        .input('userid', sql.Int, userid)
        .input('product_id', sql.Int, product_id)
        .input('rating', sql.Decimal(2, 1), rating)
        .input('review', sql.VarChar(1000), review)
        .execute('AddRating');
      
      res.status(201).json({ message: 'Rating added successfully' });
    } catch (err) {
      console.error('Error submitting rating:', err);
      res.status(500).json({ error: 'Failed to submit rating' });
    }
  };
  
  //get all ratings and reviews of product
  exports.getProductRatingsAndReviews = async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT R.rating_id, U.username, P.name AS product_name, R.rating, R.review
        FROM Rating AS R
        JOIN Users U ON R.user_id = U.user_id
        JOIN Product P ON R.product_id = P.product_id
      `);
      res.json(result.recordset);
    } catch (error) {
      console.error('Error fetching product ratings and reviews:', error);
      res.status(500).json({ error: 'Failed to fetch ratings and reviews' });
    }
  };
  
  // Get average ratings for all products
  exports.getAverageProductRatings = async (req, res) => {
    try {
      const pool = await poolPromise;
  
      const result = await pool.request().query(`
        SELECT product_id, 
               AVG(rating) AS average_rating
        FROM Rating
        GROUP BY product_id
      `);
  
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error('Error fetching average product ratings:', err);
      res.status(500).json({ error: 'Failed to fetch average product ratings' });
    }
  };
  //ratings by a specific user
  exports.getRatingsByProduct = async (req, res) => {
    const { productId } = req.params;
  
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('product_id', sql.Int, productId)
        .query(`
          SELECT R.rating_id, U.username, R.rating, R.review, R.created_at
          FROM Rating AS R
          JOIN Users U ON R.user_id = U.user_id
          WHERE R.product_id = @product_id
        `);
  
      res.json(result.recordset);
    } catch (err) {
      console.error('Error fetching ratings:', err);
      res.status(500).json({ error: 'Failed to fetch ratings' });
    }
  };
  //update rating of a product
  exports.updateProductRating = async (req, res) => {
    try {
      const { user_id1, product_id, new_rating, new_review } = req.body;
  
      const pool = await poolPromise;
      await pool.request()
        .input('user_id1', sql.Int, user_id1)
        .input('product_id', sql.Int, product_id)
        .input('new_rating', sql.Decimal(2, 1), new_rating)
        .input('new_review', sql.VarChar(1000), new_review)
        .execute('UpdateProductRating');
  
      res.json({ message: 'Rating updated successfully' });
    } catch (err) {
      console.error('Error updating rating:', err);
      res.status(500).json({ error: 'Failed to update rating' });
    }
  };
  
  
  // Get product recommendations for a user
  exports.getRecommendations = async (req, res) => {
    const { user_id } = req.params;
  
    try {
      const pool = await poolPromise;
  
      const result = await pool.request()
        .input('user_id', sql.Int, user_id)
        .execute('recommendation');
  
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
  };
  
  //get all discounted prices of products and deal detials
  exports.getDiscountedPrices = async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT 
            P.product_id AS Product_ID,
            P.name AS Product_Name,
            P.price AS Original_Price,
            PR.discount_percentage AS Discount_Percentage,
            (P.price - (P.price * PR.discount_percentage / 100)) AS Discounted_Price,
            PR.name AS Promotion_Name,
            PR.start_date AS Start_Date,
            PR.end_date AS End_Date
        FROM Product P
        JOIN ProductPromotions PP ON P.product_id = PP.product_id
        JOIN Promotions PR ON PP.promo_id = PR.promo_id
        ORDER BY PR.start_date DESC;
      `);
  
      res.json(result.recordset);
    } catch (err) {
      console.error('Error fetching discounted prices:', err);
      res.status(500).json({ error: 'Failed to fetch discounted prices and deals' });
    }
  };
  
  
  //promotions
  exports.getProductPromotions = async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT 
          P.name AS product_name, 
          Pr.name AS promo_name, 
          Pr.discount_percentage, 
          Pr.start_date, 
          Pr.end_date
        FROM Product P
        JOIN ProductPromotions PP ON P.product_id = PP.product_id
        JOIN Promotions Pr ON PP.promo_id = Pr.promo_id
      `);
  
      res.json(result.recordset);
    } catch (error) {
      console.error('Error fetching promotions:', error);
      res.status(500).json({ error: 'Failed to fetch promotions' });
    }
  };
  