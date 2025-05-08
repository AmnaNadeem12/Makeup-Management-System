const { sql, poolPromise } = require('../config/db');

const Rating = {
  // Add new rating using stored procedure
  async addRating(userid, product_id, rating, review) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('userid', sql.Int, userid)
        .input('product_id', sql.Int, product_id)
        .input('rating', sql.Decimal(2, 1), rating)
        .input('review', sql.VarChar(1000), review)
        .execute('AddRating');
    } catch (error) {
      console.error('Error adding rating:', error);
      throw error;
    }
  },

  // Get all ratings with product and user info
  async getAllRatings() {
    const pool = await poolPromise;
    const result = await pool.request().query(
      `SELECT R.rating_id, U.username, P.name AS product_name, R.rating, R.review 
       FROM Rating AS R
       JOIN Users U ON R.user_id = U.user_id
       JOIN Product P ON R.product_id = P.product_id`
    );
    return result.recordset;
  },

  // Get average rating of all products
  async getAverageRatings() {
    const pool = await poolPromise;
    const result = await pool.request().query(
      `SELECT product_id, AVG(rating) AS average_rating 
       FROM Rating 
       GROUP BY product_id`
    );
    return result.recordset;
  },

  // Get rating by a specific user for a product
  async getUserProductRating(productId, userId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('productId', sql.Int, productId)
      .input('userId', sql.Int, userId)
      .query(
        `SELECT R.rating_id, U.username, R.rating, R.review, R.created_at 
         FROM Rating AS R 
         JOIN Users U ON R.user_id = U.user_id 
         WHERE R.product_id = @productId AND R.user_id = @userId`
      );
    return result.recordset[0];
  },

  // Update an existing rating using stored procedure
  async updateProductRating(user_id1, product_id, new_rating, new_review) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('user_id1', sql.Int, user_id1)
        .input('product_id', sql.Int, product_id)
        .input('new_rating', sql.Decimal(2, 1), new_rating)
        .input('new_review', sql.VarChar(1000), new_review)
        .execute('UpdateProductRating');
    } catch (error) {
      console.error('Error updating rating:', error);
      throw error;
    }
  },

  // Get ratings by product
  async getRatingsByProduct(productId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('productId', sql.Int, productId)
      .query(
        `SELECT R.rating_id, U.username, R.rating, R.review, R.created_at 
         FROM Rating AS R
         JOIN Users U ON R.user_id = U.user_id
         WHERE R.product_id = @productId`
      );
    return result.recordset;
  },

  // Get product ratings and reviews (All products)
// Get product ratings and reviews (All products)
async getProductRatingsAndReviews() {
  const pool = await poolPromise;
  const result = await pool.request().execute('GetProductRatingsAndReviews'); // ✅ use stored procedure
  return result.recordset;
}
,

  // Get recommendations for a user
  async getRecommendations(user_id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('user_id', sql.Int, user_id)
        .execute('recommendation'); // Assuming a stored procedure named 'recommendation'
      return result.recordset;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  },

  // Get discounted prices of products
  async getDiscountedPrices() {
    const pool = await poolPromise;
    const result = await pool.request().query(
      `SELECT 
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
       ORDER BY PR.start_date DESC`
    );
    return result.recordset;
  },

  // Get product promotions
  async getProductPromotions() {
    const pool = await poolPromise;
    const result = await pool.request().query(
      `SELECT 
          P.name AS product_name, 
          Pr.name AS promo_name, 
          Pr.discount_percentage, 
          Pr.start_date, 
          Pr.end_date
       FROM Product P
       JOIN ProductPromotions PP ON P.product_id = PP.product_id
       JOIN Promotions Pr ON PP.promo_id = Pr.promo_id`
    );
    return result.recordset;
  },
};

module.exports = Rating;
