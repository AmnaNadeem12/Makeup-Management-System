const express = require('express');
const router = express.Router();
const { getAllSuppliers } = require('../controllers/supplierController');

// Route: Get all suppliers
router.get('/', getAllSuppliers);

module.exports = router;
