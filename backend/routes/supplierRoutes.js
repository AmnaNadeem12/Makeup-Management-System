const express = require('express');
const router = express.Router();
const { getAllSuppliers, addSupplier } = require('../controllers/supplierController');

// Route: Get all suppliers
router.get('/', getAllSuppliers);

// Route: Add a new supplier
router.post('/', addSupplier);

module.exports = router;
