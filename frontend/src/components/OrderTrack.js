import React, { useState } from 'react';
import './OrderTrack.css';

function OrderTrack() {
  const [userId, setUserId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId ? parseInt(userId) : null,
          order_id: orderId ? parseInt(orderId) : null
        })
      });

      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []);
        setError('');
      } else {
        setOrders([]);
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
      setError('❌ Server error');
      setOrders([]);
    }
  };

  return (
    <div className="order-track-container">
      <h2 className="order-track-title">🚚 Track Orders</h2>

      <div className="track-form">
        <input
          type="number"
          placeholder="User ID (optional)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Order ID (optional)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={handleTrack}>Track</button>
      </div>

      {error && <p className="track-error">{error}</p>}

      {orders.length > 0 && (
        <ul className="order-track-list">
          {orders.map((order) => (
            <li key={order.id || `${order.user_id}-${order.order_id}`}>
              <strong>Order #{order.order_id}</strong> — <span className="status">Status:</span> <span className="highlight">{order.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderTrack;
