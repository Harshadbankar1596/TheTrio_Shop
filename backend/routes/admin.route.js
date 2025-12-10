import express from "express";

import adminController from "../controllers/admin.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Admin Authentication
router.post("/register", adminController.register);
router.post("/login", adminController.login);

// Category Routes
router.post(
  "/create-category",
  upload.single("image"),
  adminController.addCategory
);
router.put(
  "/update-category/:categoryId",
  upload.single("image"),
  adminController.updateCategory
);
router.delete("/delete-category/:categoryId", adminController.deleteCategory);
router.get("/categories", adminController.fetchAllCategories);

// SubCategory Routes
router.post(
  "/create-subcategory",
  upload.single("image"),
  adminController.addSubCategory
);
router.put(
  "/update-subcategory/:subCategoryId",
  upload.single("image"),
  adminController.updateSubCategory
);
router.delete("/delete-subcategory/:subCategoryId", adminController.deleteSubCategory);
router.get(
  "/subcategories/:categoryId",
  adminController.fetchSubCategoriesByCategory
);

// Product Routes
router.post(
  "/add-product",
  upload.array("images", 10),
  adminController.addNewProduct
);
router.get("/products", adminController.getAllProducts);
router.put(
  "/update-product/:productId",
  upload.array("images", 10),
  adminController.updateProduct
);
router.delete("/delete-product/:productId", adminController.deleteProduct);

// Order Routes
router.get("/orders", adminController.getAllOrders);
router.put("/update-order-status/:orderId", adminController.updateOrderStatus);

// User Management Routes
router.get("/users", adminController.getAllUsers);
router.put("/update-user/:userId", adminController.updateUser);
router.delete("/delete-user/:userId", adminController.deleteUser);

// Coupon & Banner
router.post("/create-cupon", adminController.addCupon);
router.post("/create-banner", adminController.craeteBanner);

export default router;
