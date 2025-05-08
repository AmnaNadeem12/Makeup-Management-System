import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import ClientDashboard from './components/ClientDashboard';
import AdminDashboard from './components/AdminDashboard';

import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import CartList from './components/CartList';
import CartForm from './components/CartForm';
import ComplaintForm from './components/ComplaintForm';
import ComplaintList from './components/ComplaintList';
import OrderForm from './components/OrderForm';
import OrderTrack from './components/OrderTrack';
import RatingsList from './components/RatingsList';
import RatingForm from './components/RatingForm';
import StockList from './components/StockList';
import StockForm from './components/StockForm';
import SupplierList from './components/SupplierList';
import SupplierForm from './components/SupplierForm';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import WishlistForm from './components/WishlistForm';
import WishlistList from './components/WishlistList';
import RecommendationForm from './components/RecommendationForm';
import DealList from './components/DealList';
import LowStockList from './components/LowStockList';

import './index.css';

function App() {
  // eslint-disable-next-line no-unused-vars
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000')
            .then((response) => response.text())
            .then((data) => setMessage(data));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/client" element={<ClientDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/add-product" element={<ProductForm />} />
                <Route path="/cart" element={<><CartForm /><CartList /></>} />
                <Route path="/complaints" element={<><ComplaintForm /><ComplaintList /></>} />
                <Route path="/orders" element={<OrderForm />} />
                <Route path="/track-orders" element={<OrderTrack />} />
                <Route path="/ratings" element={<RatingsList />} />
                <Route path="/submit-rating" element={<RatingForm />} />
                <Route path="/stock" element={<StockList />} />
                <Route path="/add-stock" element={<StockForm />} />
                <Route path="/suppliers" element={<SupplierList />} />
                <Route path="/add-supplier" element={<SupplierForm />} />
                <Route path="/user" element={<UserList />} />
                <Route path="/add-user" element={<UserForm />} />
                <Route path="/wishlist" element={<WishlistList />} />
                <Route path="/recommendations" element={<RecommendationForm />} />
                <Route path="/deals" element={<DealList />} />
                <Route path="/add-to-wishlist" element={<WishlistForm />} />
                <Route path="/low-stock" element={<LowStockList/>}/>

            </Routes>
        </Router>
    );
}

export default App;
