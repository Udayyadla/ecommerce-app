const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("product", productSchema);
module.exports = Product;
