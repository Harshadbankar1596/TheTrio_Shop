
import {
    createCategory,
    createCupon,
    createSubCategory,
    addProduct,
    getAllCategories,
    getSubCategoriesByCategoryId,
    createBanner
} from "../services/admin.service.js";

const adminController = {

    addCategory: async (req, res) => {
        try {
            const category = await createCategory(req.body);
            return res.status(201).json({
                success: true,
                message: "Category added successfully",
                data: category
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to add category"
            });
        }
    },

    addSubCategory: async (req, res) => {
        try {
            const subCategory = await createSubCategory(req.body);
            return res.status(201).json({
                success: true,
                message: "Subcategory added successfully",
                data: subCategory
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to add subcategory"
            });
        }
    },

    fetchAllCategories: async (req, res) => {
        try {
            const categories = await getAllCategories();
            return res.status(200).json({
                success: true,
                data: categories
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || "Failed to fetch categories"
            });
        }
    },

    fetchSubCategoriesByCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const subCategories = await getSubCategoriesByCategoryId(categoryId);

            return res.status(200).json({
                success: true,
                data: subCategories
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || "Failed to fetch subcategories"
            });
        }
    },

    addNewProduct: async (req, res) => {
        try {
            const product = await addProduct(req.body);
            return res.status(201).json({
                success: true,
                message: "Product added successfully",
                data: product
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to add product"
            });
        }
    },

    addCupon: async (req, res) => {
        try {
            const cupon = await createCupon(req.body);
            return res.status(201).json({
                success: true,
                message: "Coupon created successfully",
                data: cupon
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to create coupon"
            });
        }
    },

    craeteBanner: async (req, res) => {
        try {
            const banner = await createBanner(req.body);
            return res.status(201).json({
                success: true,
                message: "Banner created successfully",
                data: banner
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to create banner"
            });
        }
    }
};

export default adminController;