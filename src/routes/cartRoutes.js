const express = require("express");
const router = express.Router();
const {
  getAllCarts,
  getCartById,
  createNewCart,
  updateCartById,
  deleteCartById,
} = require("../controllers/cartController");

// GET /api/v1/projects - Get all carts
router.get("/", getAllCarts);

// GET /api/v1/carts/:id - Get single cart by id
router.get("/:cartId", getCartById);

// POST /api/v1/carts - Create new cart
router.post("/", createNewCart);

// PUT /api/v1/carts/:id - Update Cart (by id)
router.put("/:cartId", updateCartById);

// DELETE /api/v1/carts/:id - Delete single Cart (by id)
router.delete("/:cartId", deleteCartById);

module.exports = router;
