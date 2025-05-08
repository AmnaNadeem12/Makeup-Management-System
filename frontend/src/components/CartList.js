import React, { useEffect, useState } from 'react';
import './CartList.css';

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/cart')
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error('Failed to fetch cart items:', err));
  }, []);

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 My Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-detail"><strong>Product ID:</strong> {item.product_id}</div>
              <div className="cart-detail"><strong>User ID:</strong> {item.user_id}</div>
              <div className="cart-detail"><strong>Quantity:</strong> {item.quantity}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartList;
