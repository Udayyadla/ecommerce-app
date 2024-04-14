const Product = require("../models/productModel");

exports.UploadProductController = async (req, res) => {
  try {
    const uploadProduct = new Product(req.body);
    const savedProduct = await uploadProduct.save();
    res.status(201).json({
      message: "Product uploaded successfully!",
      success: true,
      data: savedProduct,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: err.message || "Internal server error",
      success: false,
    });
  }
};
exports.searchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    // console.log(query)
    const regex = new RegExp(query, "i", "g");

    const product = await Product.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });
    return res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: err.message || "Internal server error",
      success: false,
    });
  }
};
exports.fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products) {
      return res.status(200).json({ products });
    } else {
      return res.status(404).json({ error });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: err.message || "Internal server error",
      success: false,
    });
  }
};
exports.updateProductController = async (req, res) => {
  try {
    const { _id, ...details } = req.body;
    const updateProduct = await Product.findByIdAndUpdate(_id, details);
    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
      message: "product updated successfully",
      updateProduct,
      success: true,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: err.message || "Internal server error",
      success: false,
    });
  }
};
exports.fetchProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
      message: "product fetched successfully",
      product,
      success: true,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({
        message: "Product deleted successfully",
        deletedProduct,
        success: true,
      });
  } catch (error) {
    // Handle errors
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
