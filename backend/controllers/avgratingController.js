const { sql, poolPromise } = require('../config/db');

const getProductAverageRatings = async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .execute('GetProductAverageRating');

        res.status(200).json(result.recordset); // Sends array of { product_name, average_rating }
    } catch (err) {
        console.error('Error in getProductAverageRatings:', err);
        res.status(500).json({ error: 'Server error while fetching product average ratings.' });
    }
};

module.exports = {
    getProductAverageRatings
};
