require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");

/* ----------- Create our Expres app ------------ */
const app = express();

/* ---------------------------------------------- */
/* ----------------- Middleware ----------------- */
/* ---------------------------------------------- */
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

/* ---------------------------------------------- */
/* ------------------- Routes ------------------- */
/* ---------------------------------------------- */
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/products", productRoutes);

/* ---------------------------------------------- */
/* --------------- Error Handling --------------- */
/* ---------------------------------------------- */
app.use(notFoundMiddleware);
app.use(errorMiddleware);

/* ---------------------------------------------- */
/* ---------------- Server Setup ---------------- */
/* ---------------------------------------------- */
const port = process.env.PORT || 5001;
const run = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    app.listen(port, () => {
      console.log(
        `Server is listening on ${
          process.env.NODE_ENV === "development" ? "http://localhost:" : "port "
        }${port}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

run();
