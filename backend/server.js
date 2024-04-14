const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.json());
const productRoutes = require("./routes/products.route");
const cartRoutes = require("./routes/cart.route");
const Product = require("./models/productModel");
const PORT = 8080;
const jsonData = require("./sample_products.json");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("db connection successful");

    // Check if any products exist in the database
    const existingProductsCount = await Product.countDocuments();

    // If no products exist, insert new products
    if (existingProductsCount === 0) {
      await Product.insertMany(jsonData);
      console.log("Products inserted successfully.");
    } else {
      console.log("Products already exist in the database.");
    }

    app.listen(PORT, () => console.log("app is listening at ", PORT));
  })
  .catch((err) => {
    console.log("db connection failed");
  });
