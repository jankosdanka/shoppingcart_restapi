const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    product: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
