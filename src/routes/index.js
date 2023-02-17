const express = require("express");
const router = express.Router();

const cartRoutes = require("./cartRoutes");
const productRoutes = require("./productRoutes");

router.use("/projects", cartRoutes);
router.use("/tickets", productRoutes);

module.exports = router;
