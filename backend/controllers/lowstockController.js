const { sql, poolPromise } = require('../config/db');

const getLowStockProducts = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('LowStock');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching low stock:', err);  // important for debugging
    res.status(500).json({ error: 'Failed to fetch low stock' });
  }
};

module.exports = { getLowStockProducts };
