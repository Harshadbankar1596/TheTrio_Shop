import express from "express";

import adminController from "../controllers/admin.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/create-category",
  upload.single("image"),
  adminController.addCategory
);

router.post(
  "/create-subcategory",
  upload.single("image"),
  adminController.addSubCategory
);

router.get("/categories", adminController.fetchAllCategories);
router.get(
  "/subcategories/:categoryId",
  adminController.fetchSubCategoriesByCategory
);

router.post(
  "/add-product",
  upload.array("images", 10),
  adminController.addNewProduct
);

router.post("/create-cupon", adminController.addCupon);
router.post("/create-banner", adminController.craeteBanner);

export default router;
