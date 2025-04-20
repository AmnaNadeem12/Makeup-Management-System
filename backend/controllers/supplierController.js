const { sql, poolPromise } = require('../config/db');

// Get all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetAllSuppliers');

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching suppliers:', err);
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
};

module.exports = {
  getAllSuppliers
};
