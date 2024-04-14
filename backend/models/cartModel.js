const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    productId: {
      ref: "product",
      type: mongoose.Schema.Types.ObjectId,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },

  { timestamps: true }
);
const Cart = mongoose.model("cartItem", cartSchema);
module.exports = Cart;
