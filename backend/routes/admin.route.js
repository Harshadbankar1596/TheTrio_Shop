import express from "express";

import adminController from "../controllers/admin.controller.js";

const router = express.Router();


router.post("/create-category", adminController.addCategory);
router.post("/create-subcategory", adminController.addSubCategory);
router.get("/categories", adminController.fetchAllCategories);
router.get("/subcategories/:categoryId", adminController.fetchSubCategoriesByCategory);
router.post("/add-product", adminController.addNewProduct);
router.post("/create-cupon", adminController.addCupon);
router.post("/create-banner", adminController.craeteBanner);


export default router;  