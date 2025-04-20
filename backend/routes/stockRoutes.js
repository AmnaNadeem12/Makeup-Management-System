const express = require("express");
const router = express.Router();
const { getStockDetails } = require("../controllers/stockController");

// Route to fetch stock details
router.get("/", getStockDetails);

module.exports = router;
