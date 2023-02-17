const express = require("express");
const router = express.Router();
const {
  getProducts,
  //   getProductById,
  //   createProduct,
  //   updateProductById,
  //   deleteProductById,
} = require("../controllers/productController");

// GET /api/v1/products - Get all products
router.get("/", getProducts);

// // GET /api/v1/products/:id - Get single product by id
// router.get("/:id", getProductById);

// // POST /api/v1/products - Create new product
// router.post("/", createProduct);

// // PUT /api/v1/products/:id - Update product (by id)
// router.put("/:id", updateProductById);

// // DELETE /api/v1/products/:id - Delete single product (by id)
// router.delete("/:id", deleteProductById);

module.exports = router;
