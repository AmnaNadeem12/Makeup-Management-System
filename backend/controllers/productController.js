const { sql, poolPromise } = require('../config/db');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetAllProducts');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { name, description, price, category, stock_quantity } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('name', sql.VarChar(255), name)
      .input('description', sql.Text, description)
      .input('price', sql.Decimal(10, 2), price)
      .input('category', sql.VarChar(255), category)
      .input('stock_quantity', sql.Int, stock_quantity)
      .execute('InsertProduct');

    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock_quantity } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('productId', sql.Int, id)
      .input('name', sql.VarChar(255), name)
      .input('description', sql.Text, description)
      .input('price', sql.Decimal(10, 2), price)
      .input('category', sql.VarChar(255), category)
      .input('stock_quantity', sql.Int, stock_quantity)
      .execute('UpdateProduct');

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('productId', sql.Int, id)
      .execute('DeleteProduct');

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('productId', sql.Int, id)
      .execute('GetProductById');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Get products by price range
const getProductsByPriceRange = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const pool = await poolPromise;

    const result = await pool.request()
      .input('MinPrice', sql.Decimal(10, 2), parseFloat(minPrice))
      .input('MaxPrice', sql.Decimal(10, 2), parseFloat(maxPrice))
      .execute('GetProductsByPriceRange');

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Price Filter Error:', err);
    res.status(500).json({ error: 'Failed to filter products by price.' });
  }
};
// Get products by price range
exports.getProductsByPriceRange = async (req, res) => {
    try {
      const { minPrice, maxPrice } = req.query;
  
      const pool = await poolPromise;
      const result = await pool.request()
        .input('MinPrice', sql.Decimal(10, 2), parseFloat(minPrice))
        .input('MaxPrice', sql.Decimal(10, 2), parseFloat(maxPrice))
        .execute('GetProductsByPriceRange');
  
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error('Price Filter Error:', err);
      res.status(500).json({ error: 'Failed to filter products by price.' });
    }
  };
  const getTopRatedProducts = async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute('TopRatedProducts');
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error('Error fetching top rated products:', err);
      res.status(500).json({ error: 'Failed to fetch top rated products' });
    }
  };
  
  const getTopRatedByCategory = async (req, res) => {
    const { category } = req.params;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('CategoryName', sql.VarChar(100), category)
        .execute('TopRatedProductsByCategory');
  
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error('Error fetching category-wise top rated products:', err);
      res.status(500).json({ error: 'Failed to fetch top rated products by category' });
    }
  };
  // Fetch product promotions
const getProductsWithPromotions = async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute('GetProductsWithPromotions');
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error('Error fetching promotions:', err);
      res.status(500).json({ error: 'Failed to fetch product promotions' });
    }
  };
  
  // Fetch product ratings and reviews
  const getProductRatingsAndReviews = async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute('GetProductRatingsAndReviews');
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      res.status(500).json({ error: 'Failed to fetch product ratings and reviews' });
    }
  };
  // Fetch products that are out of stock or low in stock
const getStockAlerts = async (req, res) => {
    const threshold = req.query.threshold || 20; // default is 20 if not specified
  
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('LowStockThreshold', sql.Int, threshold)
        .execute('GetStockAlerts');
  
      const outOfStock = result.recordsets[0];
      const lowStock = result.recordsets[1];
  
      res.status(200).json({
        outOfStock,
        lowStock
      });
    } catch (err) {
      console.error('Error fetching stock alerts:', err);
      res.status(500).json({ error: 'Failed to fetch stock alerts' });
    }
  };

  // Get product recommendations based on user behavior
const getProductRecommendations = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('user_id', sql.Int, userId)
        .execute('recommendation');
  
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      res.status(500).json({ error: 'Failed to fetch product recommendations' });
    }
  };
  module.exports = {
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
    getProductRecommendations     // ✅ Add this line
  };
  