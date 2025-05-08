import React, { useState } from 'react';
import './ClientDashboard.css';
// Importing your components
import ProductList from './ProductList';
import CartForm from './CartForm';
import CartList from './CartList';
import ComplaintForm from './ComplaintForm';
import ComplaintList from './ComplaintList';
import OrderForm from './OrderForm';
import OrderTrack from './OrderTrack';
import RatingsList from './RatingsList';
import RatingForm from './RatingForm';
import UserForm from './UserForm';
import UserList from './UserList';
import WishlistForm from './WishlistForm';
import WishlistList from './WishlistList';
import RecommendationForm from './RecommendationForm';
import DealList from './DealList';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  const renderComponent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductList />;
      case 'cart':
        return (
          <>
            <CartForm />
            <CartList />
          </>
        );
      case 'complaints':
        return (
          <>
            <ComplaintForm />
            <ComplaintList />
          </>
        );
      case 'orders':
        return <OrderForm />;
      case 'trackOrders':
        return <OrderTrack />;
      case 'ratings':
        return <RatingsList />;
      case 'submitRating':
        return <RatingForm />;
      case 'users':
        return <UserList />;
      case 'viewWishlist':
        return <WishlistList />;
      case 'addToWishlist':
        return <WishlistForm />;
      case 'recommendations':
        return <RecommendationForm />;
      case 'deals':
        return <DealList />;
      default:
        return <ProductList />;
    }
  };

  const tabs = [
    ['products', 'Products'],
    ['cart', 'Cart'],
    ['complaints', 'Complaints'],
    ['orders', 'Orders'],
    ['trackOrders', 'Track Orders'],
    ['ratings', 'Ratings'],
    ['submitRating', 'Submit Rating'],
    ['users', 'Users'],
    ['viewWishlist', 'View Wishlist'],
    ['addToWishlist', 'Add to Wishlist'],
    ['recommendations', 'Recommendations'],
    ['deals', 'Deals'],
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">🛍️ Client Dashboard</h2>
      <div className="dashboard-tabs">
        {tabs.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`dashboard-tab ${activeTab === key ? 'active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="dashboard-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ClientDashboard;
