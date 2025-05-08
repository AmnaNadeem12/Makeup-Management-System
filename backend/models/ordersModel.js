const { sql, poolPromise } = require('../config/db');

const placeOrder = async (user_id) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('user_id', sql.Int, user_id)
    .execute('PlaceOrder');

  console.log('Raw SQL Result:', result);

  const orderDetails = result.recordsets[0];
  const totalAmount = result.recordsets[1]?.[0]?.totalAmount || 0;

  console.log('Order Details:', orderDetails);
  console.log('Total Amount:', totalAmount);

  return {
    details: orderDetails,
    totalAmount
  };
};


const cancelOrder = async (user_id, order_id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('user_id', sql.Int, user_id)
      .input('order_id', sql.Int, order_id)
      .execute('CancelOrder');
    return result.recordset[0]; // Return the message
  } catch (error) {
    throw error;
  }
};

const trackOrder = async (user_id = null, order_id = null) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    if (user_id !== null) {
      request.input('user_id', sql.Int, user_id);
    }
    if (order_id !== null) {
      request.input('order_id', sql.Int, order_id);
    }

    const result = await request.execute('TrackOrder');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  placeOrder,
  cancelOrder,
  trackOrder
};
