const Cart = require("../models/Cart");
const Project = require("../models/Cart");
const { NotFoundError, BadRequestError } = require("../utils/errors");

exports.getAllCarts = async (req, res, next) => {
  const carts = await Cart.find();

  return res.json(carts);
};

exports.getCartById = async (req, res, next) => {
  // Get our project id (put in local variable)
  const cartId = req.params.id;

  // Find cart with that id
  const cart = await Cart.findById(cartId);

  // IF(no project) return 404
  if (!cart) throw new NotFoundError("That cart does not exist...");

  // respond with cart data (200 OK)
  return res.json(cart);
};

exports.createNewCart = async (req, res, next) => {
  // Get data from req.body and place in local variables
  const name = req.body.name;
  const totalPrice = req.body.totalPrice || 0;

  // If (no name || name is empty string) respond bad request
  if (!name) throw new BadRequestError("You must provide a name");

  // Create Cart
  const newCart = await Project.create({
    name: name,
    totalPrice: totalPrice,
  });

  // Respond
  // prettier-ignore
  return res
    // Add Location header to response
    // Location header = URI pointing to endpoint where user can get new project
    .setHeader(
      'Location', 
      `http://localhost:${process.env.PORT}/api/v1/carts/${newCart._id}`
    )
    .status(201)
    .json(newCart)
};

exports.addToCartById = async (req, res, next) => {
  const cartId = req.params.cartId;
  const pId = req.body.pId;
  let quantityToAdd = req.body.quantity || 1;
  const cart = await Cart.findById(cartId);

  if (!cart) throw new NotFoundError("This cart does not exist");

  const products = cart.products;

  const existingProductIndex = products.findIndex(
    (product) => product.product == pId
  );

  if (existingProductIndex > -1) {
    products[existingProductIndex].quantity += quantityToAdd;
  } else {
    products.push({
      product: pId,
      quantity: quantityToAdd,
    });
  }

  await cart.populate("products.product");

  let totalPrice = cart.totalPrice || 0;
  products.forEach((product) => {
    if (product.product._id == pId) {
      totalPrice += product.product.productPrice * quantityToAdd;
    }
  });
  cart.totalPrice = totalPrice;

  await cart.save();

  return res.json(cart);
};

exports.removeFromCartById = async (req, res, next) => {
  const cartId = req.params.cartId;
  const pId = req.body.pId;
  let quantityToRemove = req.body.quantity || 1;
  const cart = await Cart.findById(cartId);
  if (!cart) throw new NotFoundError("This cart does not exist");

  let products = cart.products;
  await cart.populate("products.product");

  const productIndex = products.findIndex(
    (product) => product.product._id == pId
  );

  if (productIndex < 0) throw new BadRequestError("Already empty cart!");

  if (products[productIndex].quantity > quantityToRemove) {
    products[productIndex].quantity -= quantityToRemove;

    let totalPrice = cart.totalPrice || 0;

    products.forEach((product) => {
      if (product.product._id == pId) {
        totalPrice -= product.product.productPrice * quantityToRemove;
      }
    });

    cart.totalPrice = totalPrice;
  } else {
    cart.totalPrice -= products[productIndex].product.productPrice;
    products.splice(productIndex, 1);
  }

  //await cart.populate('products.product')

  await cart.save();
  const cartRes = await cart.populate("products.product");
  return res.json(cartRes);
};

exports.deleteCartById = async (req, res, next) => {
  // Get cart id and place in local variable
  const cartId = req.params.cartId;
  // Check if project exists
  const cartToDelete = await Cart.findById(cartId);
  // IF (no project) return Not Found
  if (!cartToDelete) throw new NotFoundError("This cart does not exist");

  // Delete cart
  await cartToDelete.delete();

  // Craft our response
  return res.sendStatus(204);
};
