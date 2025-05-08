const { sql, poolPromise } = require('../config/db');

// Controller to get all deals
const getAllDeals = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .execute('ViewAllDeals');  // Execute the stored procedure

    res.status(200).json(result.recordset);  // Send the result as a JSON response
  } catch (err) {
    console.error('Error fetching deals:', err);
    res.status(500).json({ error: 'Failed to fetch deals' });  // Error handling
  }
};

module.exports = {
  getAllDeals
};