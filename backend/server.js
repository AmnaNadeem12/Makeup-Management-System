require('dotenv').config();  // Load environment variables
const express = require('express');
const cors = require('cors');

// Import routes
const taskRoutes = require('./routes/taskRoutes');
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const stockRoutes = require('./routes/stockRoutes');
const cartRoutes = require('./routes/cartRoutes');  // Import cart routes
const userRoutes = require('./routes/userRoutes');  // Import user routes

const wishlistRoutes = require('./routes/wishlistRoutes');  
const app = express();
const orderRoutes = require('./routes/ordersRoutes');
const complaintsRoutes = require('./routes/complaintsRoutes');

// after other app.use(...)
const ratingRoutes = require('./routes/ratingRoutes');
app.use('/api', ratingRoutes);

// Middleware setup
app.use(express.json());  // For parsing application/json
app.use(cors());  // Enable Cross-Origin Request Sharing

// Register routes

app.use('/api/complaints', complaintsRoutes);
app.use('/api/cart', cartRoutes);  // Cart routes
app.use('/api/tasks', taskRoutes);  // Task routes
app.use('/api/products', productRoutes);  // Product routes
app.use('/api/suppliers', supplierRoutes);  // Supplier routes
app.use('/api/stock', stockRoutes);  // Stock routes
app.use('/api/user', userRoutes);  // User routes
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Error handling middleware (Global error handler)
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log error details
    res.status(500).json({ error: 'Something went wrong!' });  // Send error response
});

// Default route for testing the server
app.get('/', (req, res) => {
    res.send('Hello from Node.js Backend!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
