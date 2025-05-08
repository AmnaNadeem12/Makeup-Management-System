
import React, { useState } from 'react';
import ProductForm from './ProductForm';
import StockList from './StockList';
import StockForm from './StockForm';
import SupplierForm from './SupplierForm';
import SupplierList from './SupplierList'; 
import UpdateOrderForm from './UpdateOrderForm';
import LowStockList from './LowStockList';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('addProduct');

  const renderComponent = () => {
    switch (activeTab) {
      case 'addProduct': return <ProductForm />;
      case 'stockList': return <StockList />;
      case 'addStock': return <StockForm />;
     // case 'addSupplier': return <SupplierForm />;
      case 'supplierList': return <SupplierList />; 
      case 'manageOrder': return <UpdateOrderForm />;
      case 'lowStock': return <LowStockList />;
      default: return <ProductForm />;
    }
  };

  const tabs = [
    ['addProduct', 'Add Product'],
    ['stockList', 'Stock List'],
    // ['addStock', 'Add Stock'],
    //['addSupplier', 'Add Supplier'],
    ['supplierList', 'Supplier List'], 
    ['manageOrder', 'Manage Orders'],
    ['lowStock', 'Low Stock Products']
  ];

  return (
    <div className="admin-container">
      <h2 className="admin-title">🧾 Admin Dashboard</h2>
      <div className="admin-tabs">
        {tabs.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`admin-tab ${activeTab === key ? 'active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="admin-content">{renderComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
