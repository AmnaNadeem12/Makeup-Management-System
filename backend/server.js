require('dotenv').config();  // Load environment variables
const express = require('express');
const cors = require('cors');
const app = express();
// Import routes
const taskRoutes = require('./routes/taskRoutes');
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const stockRoutes = require('./routes/stockRoutes');
const cartRoutes = require('./routes/cartRoutes');  // Import cart routes
const userRoutes = require('./routes/userRoutes');  // Import user routes
const recommendationRoutes=require('./routes/recommendationRoutes');
const dealRoutes=require('./routes/dealRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');  

const orderRoutes = require('./routes/ordersRoutes');
const complaintsRoutes = require('./routes/complaintsRoutes');

const ratingsRoutes = require('./routes/ratingsRoutes');
const avgratingRoutes = require('./routes/avgratingRoutes');
const lowStockRoutes = require('./routes/lowstockRoutes');

// after other app.use(...)

// Middleware setup
app.use(express.json());  // For parsing application/json
app.use(cors());  // Enable Cross-Origin Request Sharing

// Register routes
app.use('/api', ratingsRoutes);
app.use('/api/avgratings', avgratingRoutes);
app.use('/api/lowstock', lowStockRoutes);

app.use('/api/complaints', complaintsRoutes);
app.use('/api/cart', cartRoutes);  // Cart routes
app.use('/api/tasks', taskRoutes);  // Task routes
app.use('/api/products', productRoutes);  // Product routes
app.use('/api/suppliers', supplierRoutes);  // Supplier routes
app.use('/api/stock', stockRoutes);  // Stock routes
app.use('/api/user', userRoutes);  // User routes
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api', dealRoutes);
// Error handling middleware (Global error handler)
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log error details
    res.status(500).json({ error: 'Something went wrong!' });  // Send error response
});

// Default route for testing the server
app.get('/', (req, res) => {
    res.send('WELCOME');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
