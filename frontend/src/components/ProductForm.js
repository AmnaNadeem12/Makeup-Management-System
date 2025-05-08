import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price,
      category,
      stock_quantity: stockQuantity
    };

    try {
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        setMessage('✅ Product added successfully!');
        // Clear fields
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setStockQuantity('');
      } else {
        setMessage('❌ Failed to add product.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Server error.');
    }
  };

  return (
    <div className="product-form-container">
      <h2 className="form-title">➕ Add New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (Rs)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default ProductForm;
