const { sql, poolPromise } = require('../config/db');

// Add Product to Wishlist
const addToWishlist = async (req, res) => {
  const { user_id, product_id } = req.body;  // Assuming data comes from the request body
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('user_id', sql.Int, user_id)
      .input('product_id', sql.Int, product_id)
      .execute('AddToWishlist');  // Call the stored procedure to add to wishlist

    res.status(200).json({ message: 'Product added to wishlist successfully' });
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    res.status(500).json({ error: 'Failed to add product to wishlist' });
  }
};

// View Wishlist for User
const viewWishlist = async (req, res) => {
  const { user_id } = req.params;  // Get user_id from the request params
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('user_id', sql.Int, user_id)
      .execute('ViewWishlist');  // Call the stored procedure to view the wishlist

    res.status(200).json(result.recordset);  // Send the wishlist items
  } catch (err) {
    console.error('Error viewing wishlist:', err);
    res.status(500).json({ error: 'Failed to retrieve wishlist' });
  }
};

module.exports = { addToWishlist, viewWishlist };
