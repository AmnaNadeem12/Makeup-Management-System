// controllers/ordersController.js
const { sql, poolPromise } = require('../config/db');
const orderModel = require('../models/ordersModel');
const placeOrder = async (req, res) => {
  const { user_id } = req.body;

  try {
    const result = await orderModel.placeOrder(user_id);

    res.status(201).json({
      message: 'Order placed successfully',
      orderDetails: result.details,
      totalAmount: result.totalAmount
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
  
// New updateOrder function
const updateOrder = async (req, res) => {
  const { order_id, new_status, new_product_id, new_quantity, new_price } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('order_id', sql.Int, order_id)
      .input('new_status', sql.VarChar(20), new_status)
      .input('new_product_id', sql.Int, new_product_id) // Optional, can be null if not provided
      .input('new_quantity', sql.Int, new_quantity) // Optional, can be null if not provided
      .input('new_price', sql.Decimal(10, 2), new_price) // Optional, can be null if not provided
      .execute('UpdateOrders'); // Assuming your stored procedure is named UpdateOrders

    res.status(200).json({
      message: 'Order updated successfully',
      updatedOrder: result.recordset
    });
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Order update failed' });
  }
};

module.exports = { placeOrder, cancelOrder, trackOrder, updateOrder };
