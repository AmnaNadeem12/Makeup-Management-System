import React, { useState } from 'react';
import './UpdateOrderForm.css';

const UpdateOrderForm = () => {
  const [orderId, setOrderId] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateOrder = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/orders/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: parseInt(orderId),
          new_status: newStatus,
          new_product_id: null,
          new_quantity: null,
          new_price: null,
        }),
      });

      const data = await res.json();
      setMessage(res.ok ? data.message : data.error);
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error while updating order.');
    }
  };

  return (
    <div className="update-form-container">
      <h2 className="update-form-title">📝 Update Order Status</h2>
      <div className="update-form">
        <input
          type="number"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Status (e.g. Shipped, Cancelled)"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          required
        />
        <button onClick={handleUpdateOrder}>Update</button>
        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
};

export default UpdateOrderForm;
