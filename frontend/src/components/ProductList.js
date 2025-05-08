import React, { useEffect, useState } from 'react';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchTopRatedProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:3000/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const fetchTopRatedProducts = async () => {
    const response = await fetch('http://localhost:3000/api/products/top-rated');
    const data = await response.json();
    setTopRatedProducts(data);
  };

  const handlePriceFilter = async () => {
    const response = await fetch(
      `http://localhost:3000/api/products/filter/price?minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    const filteredProducts = await response.json();
    setProducts(filteredProducts);
  };

  return (
    <div className="product-page">
      <h2 className="product-title">🌸 Our Makeup Collection</h2>

      <div className="filter-bar">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={handlePriceFilter}>💰 Filter</button>
      </div>

      <h3 className="section-title">⭐ Top Rated Products</h3>
      <div className="product-grid">
        {topRatedProducts.map((product) => (
          <div key={product.product_id} className="product-card top-rated">
            <div className="product-header">{product.product_name}</div>
            <p className="product-info">Category: {product.category}</p>
            <p className="product-rating">Rating: ⭐ {product.rating}</p>
          </div>
        ))}
      </div>

      <h3 className="section-title">🛍️ All Products</h3>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.product_id} className="product-card">
            <div className="product-header">{product.name}</div>
            <p className="product-info">{product.description}</p>
            <p className="product-info">Category: {product.category}</p>
            <p className="product-info">Price: Rs. {product.price}</p>
            <p className="product-info">Stock: {product.stock_quantity}</p>
            <p className="product-id">ID: {product.product_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
