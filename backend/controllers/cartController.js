const { sql, poolPromise } = require('../config/db');

// View Cart Items
const getCartItems = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetCartItems'); // Assuming you have a stored procedure for this
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

// Add Item to Cartconst 
addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ error: 'Missing required fields: user_id, product_id, quantity' });
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('user_id', sql.Int, user_id)
      .input('product_id', sql.Int, product_id)
      .input('quantity', sql.Int, quantity)
      .execute('AddToCart'); // matches your stored procedure name exactly


    res.status(201).json({ message: 'Item added to cart' });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    const pool = await poolPromise; // ✅ Use the shared pool here

    await pool.request()
      .input('user_id', sql.Int, user_id)
      .input('product_id', sql.Int, product_id)
      .execute('RemoveFromCart');

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (err) {
    console.error('Error removing item from cart:', err);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};


module.exports = {
  getCartItems,
  addToCart,
  removeFromCart
};
