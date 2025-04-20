const { sql, poolPromise } = require('../config/db');

const getStockDetails = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT S.stock_id, P.name AS Product, SP.name AS Supplier, S.quantity 
            FROM Stock S
            JOIN Product P ON S.product_id = P.product_id
            JOIN Supplier SP ON S.supplier_id = SP.supplier_id
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error in getStockDetails controller:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getStockDetails
};
