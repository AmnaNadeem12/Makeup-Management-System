import React, { useState } from 'react';
import './CartForm.css';

const CartForm = () => {
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [action, setAction] = useState('add');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      user_id: parseInt(userId),
      product_id: parseInt(productId),
      ...(action === 'add' ? { quantity: parseInt(quantity) } : {}),
    };

    const endpoint =
      action === 'add'
        ? 'http://localhost:3000/api/cart'
        : 'http://localhost:3000/api/cart/remove';

    const method = action === 'add' ? 'POST' : 'DELETE';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      alert(data.message || 'Operation successful');
    } catch (err) {
      console.error('Cart operation failed:', err);
      alert('Error occurred while performing the operation.');
    }
  };

  return (
    <div className="cart-form-container">
      <h2 className="cart-form-title">
        {action === 'add' ? '🛍️ Add to Cart' : '❌ Remove from Cart'}
      </h2>
      <form className="cart-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
        {action === 'add' && (
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        )}
        <div className="button-group">
          <button type="submit" className="submit-btn">
            {action === 'add' ? 'Add' : 'Remove'}
          </button>
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setAction(action === 'add' ? 'remove' : 'add')}
          >
            Switch to {action === 'add' ? 'Remove' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CartForm;
