const { sql, poolPromise } = require('../config/db');

const addRating = async (req, res) => {
    const { user_id, product_id, rating, review } = req.body;

    // Input validation (basic)
    if (!user_id || !product_id || !rating || !review) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }
    if (rating < 0 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 0 and 5.' });
    }

    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input('userid', sql.Int, user_id)
            .input('product_id', sql.Int, product_id)
            .input('rating', sql.Decimal(2, 1), rating)
            .input('review', sql.VarChar(1000), review)
            .execute('AddRating');

        // Assuming the stored procedure returns a message in the first record of the result set
        if (result.recordset.length > 0) {
            res.status(200).json({ message: result.recordset[0].message });
        } else {
            res.status(500).json({ error: 'Failed to add rating.' });
        }
    } catch (err) {
        console.error('Error in addRating:', err); // Check backend logs!
        res.status(500).json({ error: 'Server error while adding rating.' });
    }
};

module.exports = {
    addRating
};
