// controllers/ordersController.js
const { sql, poolPromise } = require('../config/db');
const orderModel = require('../models/ordersModel');

const placeOrder = async (req, res) => {
  const { user_id } = req.body;

  try {
    const order = await orderModel.placeOrder(user_id);

    res.status(201).json({
      message: 'Order placed successfully',
      order: order
    });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Order placement failed' });
  }
};
const cancelOrder = async (req, res) => {
    const { user_id, order_id } = req.body;
  
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('user_id', sql.Int, user_id)
        .input('order_id', sql.Int, order_id)
        .execute('CancelOrder');
  
      res.status(200).json({
        message: result.recordset[0].message
      });
    } catch (err) {
      console.error('Error cancelling order:', err);
      res.status(500).json({ error: 'Order cancellation failed' });
    }
  };
  const trackOrder = async (req, res) => {
    const { user_id, order_id } = req.body;
  
    try {
      const orders = await orderModel.trackOrder(user_id, order_id);
      res.status(200).json({ orders });
    } catch (err) {
      console.error('Error tracking order:', err);
      res.status(500).json({ error: 'Failed to retrieve order status' });
    }
  };
  
  module.exports = { placeOrder, cancelOrder, trackOrder };

