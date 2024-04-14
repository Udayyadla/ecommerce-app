const {
  UploadProductController,
  searchProduct,
  fetchAllProducts,
  updateProductController,
  fetchProductById,
  deleteProduct,
} = require("../controllers/product.controllers");

const router = require("express").Router();
router.post("/uploadProduct", UploadProductController);
router.get("/searchProduct", searchProduct);
router.get("/getAllProducts", fetchAllProducts);
router.get("/updateProduct", updateProductController);
router.get("/product/:productId", fetchProductById);
router.get("/deleteProduct/:productId", deleteProduct);
module.exports = router;
