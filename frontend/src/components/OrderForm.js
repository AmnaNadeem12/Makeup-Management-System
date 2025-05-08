import React, { useState } from 'react';
import './OrderForm.css';

function OrderForm() {
  const [userId, setUserId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [orderDetails, setOrderDetails] = useState([]);
  const [total, setTotal] = useState(null);

  const handlePlaceOrder = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/orders/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: parseInt(userId) })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setOrderDetails(data.orderDetails || []);
        setTotal(data.totalAmount);
      } else {
        setMessage(data.error);
        setOrderDetails([]);
        setTotal(null);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error while placing order.');
      setOrderDetails([]);
      setTotal(null);
    }
  };

  const handleCancelOrder = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/orders/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: parseInt(userId),
          order_id: parseInt(orderId)
        })
      });
      const data = await res.json();
      setMessage(res.ok ? data.message : data.error);
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error while canceling order.');
    }
  };

  return (
    <div className="order-form-container">
      <h2 className="order-title">📦 Order Management</h2>

      <div className="order-form">
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Order ID (for cancel only)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <div className="button-group">
          <button onClick={handlePlaceOrder}>Place Order</button>
          <button onClick={handleCancelOrder} className="cancel-btn">Cancel Order</button>
        </div>

        {message && <p className="form-message">{message}</p>}
      </div>

      {orderDetails.length > 0 && (
        <div className="order-details">
          <h4>🧾 Order Summary</h4>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((item, index) => (
                <tr key={index}>
                  <td>{item.Product}</td>
                  <td>{item.quantity}</td>
                  <td>Rs. {item.price}</td>
                  <td>Rs. {item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total"><strong>Total: Rs. {total}</strong></p>
        </div>
      )}
    </div>
  );
}

export default OrderForm;
