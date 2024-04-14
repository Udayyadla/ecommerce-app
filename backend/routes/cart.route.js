const { addtocartController, getAllCartItems, removeCartItem } = require("../controllers/cart.controller")

const router=require("express").Router()
router.post("/addTocart",addtocartController)
router.get("/getAllCartItems",getAllCartItems)
router.delete("/removeCartItem/:cartId",removeCartItem)
module.exports=router