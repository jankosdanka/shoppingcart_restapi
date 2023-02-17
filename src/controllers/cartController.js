const Cart = require("../models/Cart");
const Project = require("../models/Cart");
const { NotFoundError, BadRequestError } = require("../utils/errors");

exports.getAllCarts = async (req, res, next) => {
  const carts = await Cart.find();

  return res.json(carts);
};

exports.getCartById = async (req, res, next) => {
  // Get our project id (put in local variable)
  const projectId = req.params.projectId;

  // Find project with that id
  const project = await Project.findById(projectId);

  // IF(no project) return 404
  if (!project) throw new NotFoundError("This project does not exist");

  // respond with project data (200 OK)
  return res.json(project);
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

exports.updateProjectById = async (req, res, next) => {
  // Place project id in local variable
  const projectId = req.params.projectId;

  // Place name and description from req.body in local variables
  const { name, description } = req.body;

  // If no name && description respond with Bad Request
  if (!name && !description)
    throw new BadRequestError(
      "You must provide a name or a description to update..."
    );

  // Get project
  const projectToUpdate = await Project.findById(projectId);

  // If (no project) respond with Not Found
  if (!projectToUpdate) throw new NotFoundError("This project does not exist");

  // Update project
  if (name) projectToUpdate.name = name;
  if (description) projectToUpdate.description = description;
  const updatedProject = await projectToUpdate.save();

  // Craft response (return updated project)
  return res.json(updatedProject);
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

exports.updateCartById = (req, res) => {
  return res.send("hello");
};
