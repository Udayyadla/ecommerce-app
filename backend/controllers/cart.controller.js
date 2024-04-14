const Cart = require("../models/cartModel");

exports.addtocartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) {
      return res
        .status(400)
        .json({ message: "ProductId is required." });
    }
    // Create a new cart item
    const newItem = new Cart({
      productId,
      quantity,
    });

    // Save the new cart item to the database
    const savedItem = await newItem.save();

    // Respond with the newly added item
    res.status(201).json({ message: "Item added to cart", newItem: savedItem });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getAllCartItems=async(req,res)=>{
    try{
        const cartItems = await Cart.find({});
        if (cartItems) {
          return res.status(200).json({ cartItems });
        } else {
          return res.status(404).json({ error });
        }

    }catch(err){
        console.log(err.message);
        res.status(500).json({
          message: err.message || "Internal server error",
          success: false,
        });
    }
}
exports.removeCartItem=async(req,res)=>{
  const {cartId}=req.params
  try{
    const deletedProduct = await Cart.findByIdAndDelete(cartId);
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

  }catch(err){
        console.log(err.message);
        res.status(500).json({
          message: err.message || "Internal server error",
          success: false,
        });
    }
}
