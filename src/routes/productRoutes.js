const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers/productController");

// GET /api/v1/products - Get all products
router.get("/", getProducts);

module.exports = router;
