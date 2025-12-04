import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/banner/:name" , userController.getBannerByName)
router.get("/category" , userController.getCategory)
router.get("/products/category/:categoryId" , userController.getProductBycategory)
router.get("/product/:productId" , userController.getproductById)
router.post("/cart/add" , userController.addcartitem)
router.get("/cart/:userId" , userController.getCartItems)
router.post("/add-address" ,userController.addAddress )
router.get("/get-alladdress/:userId" , userController.getAllAddress)
router.put("/remove-cartitem" , userController.removeCart)
router.post("/create-review" , userController.createReview)
router.get("/get-product-review/:ProductId" , userController.getReview)
router.post("/checkoutpayment" , userController.CheckOutPayment)

export default router;