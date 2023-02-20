const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { BadRequestError, NotFoundError } = require("../utils/errors");

// const { ticketStatus } = require("../../constants/tickets");

exports.getProducts = async (req, res) => {
  const products = await Product.find();

  return res.json(products);
};

// exports.getTicketById = async (req, res) => {
//   const ticketId = req.params.id;

//   const ticket = await Ticket.findById(ticketId);
//   if (!ticket) throw new NotFoundError("That ticket does not exist...");

//   return res.json(ticket);
// };

// exports.createTicket = async (req, res) => {
//   const title = req.body?.title;
//   const description = req.body?.description || "";
//   const status = ticketStatus.NEW;
//   const priority = req.body?.priority;
//   const type = req.body?.type;
//   const projectId = req.body.projectId;

//   if (!title || !type || !projectId) {
//     throw new BadRequestError(
//       "You must include a type, title and project id for your ticket..."
//     );
//   }

//   const projectExists = await Project.exists({ _id: projectId });
//   if (!projectExists) {
//     throw new BadRequestError(
//       `There is no project with the id ${projectId}. Please enter a valid project id...`
//     );
//   }

//   const newTicket = await Ticket.create({
//     title,
//     description,
//     type,
//     status,
//     priority,
//     project: projectId,
//   });

//   // prettier-ignore
//   return res
// 		.setHeader('Location', `/api/v1/tickets/${newTicket._id.toString()}`)
// 		.status(201)
// 		.json(newTicket)
// };

// exports.updateTicketById = async (req, res) => {
//   const ticketId = req.params.id;

//   const newTitle = req.body?.title;
//   const newDescription = req.body?.description;
//   const newStatus = req.body?.status;
//   const newPriority = req.body?.priority;
//   const newType = req.body?.type;

//   const ticket = await Ticket.findById(ticketId);
//   if (!ticket) throw new NotFoundError("That ticket does not exist...");

//   if (newTitle) ticket.title = newTitle;
//   if (newDescription) ticket.description = newDescription;
//   if (newStatus) ticket.status = newStatus;
//   if (newPriority) ticket.priority = newPriority;
//   if (newType) ticket.type = newType;

//   const updatedTicket = await ticket.save();
//   return res.status(200).json(updatedTicket);
// };

// exports.deleteTicketById = async (req, res) => {
//   const ticketId = req.params.id;

//   const ticketToDelete = await Ticket.findById(ticketId);
//   if (!ticketToDelete) throw new NotFoundError("That ticket does not exist...");

//   await ticketToDelete.delete();

//   return res.sendStatus(204);
// };
