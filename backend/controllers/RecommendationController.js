const { sql, poolPromise } = require('../config/db');

// Get product recommendations for a user
const getRecommendations = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);  // Extract userId from URL parameter

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('user_id', sql.Int, userId)  // Pass user_id as input parameter
      .execute('recommendation');  // Call the stored procedure

    res.status(200).json(result.recordset);  // Return recommendations as a JSON response
  } catch (err) {
    console.error('Error fetching recommendations:', err);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};

module.exports = { getRecommendations };