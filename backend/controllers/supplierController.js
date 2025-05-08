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

// Add a new supplier
const addSupplier = async (req, res) => {
  const { name, contact_info } = req.body;

  // Basic validation
  if (!name || name.trim() === '' || !contact_info || contact_info.trim() === '') {
    return res.status(400).json({ error: 'Name and contact email are required.' });
  }

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('name', sql.VarChar(255), name.trim())
      .input('contact_info', sql.VarChar(255), contact_info.trim())
      .execute('AddSupplier');

    const newId = result.recordset?.[0]?.new_supplier_id;

    if (newId) {
      res.status(201).json({
        message: 'Supplier added successfully.',
        supplier_id: newId
      });
    } else {
      res.status(500).json({ error: 'Supplier added, but failed to return ID.' });
    }

  } catch (err) {
    console.error('Error adding supplier:', err);

    // SQL-level validation error from RAISERROR
    if (err.message.includes('Supplier name') || err.message.includes('Contact info')) {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: 'Server error while adding supplier.' });
  }
};

module.exports = {
  getAllSuppliers,
  addSupplier
};
