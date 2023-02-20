const express = require("express");
const router = express.Router();
const {
  getAllCarts,
  getCartById,
  createNewCart,
  addToCartById,
  removeFromCartById,
  deleteCartById,
} = require("../controllers/cartController");

// GET /api/v1/projects - Get all carts
router.get("/", getAllCarts);

// GET /api/v1/carts/:id - Get single cart by id
router.get("/:cartId", getCartById);

// POST /api/v1/carts - Create new cart
router.post("/", createNewCart);

// PUT /api/v1/carts/:id - add to Cart (by id)
router.put("/:cartId/products", addToCartById);

// DELETE /api/v1/carts/:id - Update and remove from Cart (by id)
router.delete("/:cartId/products", removeFromCartById);

// DELETE /api/v1/carts/:id - Delete single Cart (by id)
router.delete("/:cartId", deleteCartById);

module.exports = router;
