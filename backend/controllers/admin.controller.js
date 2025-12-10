
import {
    createCategory,
    createCupon,
    createSubCategory,
    addProduct,
    getAllCategories,
    getSubCategoriesByCategoryId,
    createBanner,
    createAdmin,
    findAdminByEmail,
    updateCategory,
    deleteCategory,
    updateSubCategory,
    deleteSubCategory,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllOrdersAdmin,
    updateOrderStatus,
    getAllUsers,
    updateUser,
    deleteUser
} from "../services/admin.service.js";
import generateToken from "../utils/generateJWT.js";
import fs from "fs"

const adminController = {
    // Admin Authentication
    register: async (req, res) => {
        try {
            const admin = await createAdmin(req.body);
            const token = generateToken(admin._id);
            res.cookie("adminToken", token, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: "none",
            });
            return res.json({
                success: true,
                message: "Admin registered successfully",
                admin,
                token,
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Registration failed",
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const admin = await findAdminByEmail(email, password);
            if (!admin) {
                return res.status(404).json({
                    success: false,
                    message: "Admin not found",
                });
            }
            const token = generateToken(admin._id);
            res.cookie("adminToken", token, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: "none",
            });
            return res.json({
                success: true,
                message: "Login successful",
                admin,
                token,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || "Login failed",
            });
        }
    },

    addCategory: async (req, res) => {
        try {
            const category = await createCategory(req.body , req.file.path);
            //  fs.unlinkSync(req.file.path);
            return res.status(201).json({
                success: true,
                message: "Category added successfully",
                data: category
            });
        } catch (error) {
            // fs.unlinkSync(req.file.path);
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to add category"
            });
        }
    },

    addSubCategory: async (req, res) => {
        try {
            const subCategory = await createSubCategory(req.body , req.file.path);
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
              
            const product = await addProduct(req.body , req.files);
            return res.status(201).json({
                success: true,
                message: "Product added successfully",
                data: product
            });
        } catch (error) {
            console.log(error);
            
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
    },

    // Category CRUD
    updateCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const category = await updateCategory(categoryId, req.body, req.file?.path);
            return res.status(200).json({
                success: true,
                message: "Category updated successfully",
                data: category
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to update category"
            });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            await deleteCategory(categoryId);
            return res.status(200).json({
                success: true,
                message: "Category deleted successfully"
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to delete category"
            });
        }
    },

    // SubCategory CRUD
    updateSubCategory: async (req, res) => {
        try {
            const { subCategoryId } = req.params;
            const subCategory = await updateSubCategory(subCategoryId, req.body, req.file?.path);
            return res.status(200).json({
                success: true,
                message: "Subcategory updated successfully",
                data: subCategory
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to update subcategory"
            });
        }
    },

    deleteSubCategory: async (req, res) => {
        try {
            const { subCategoryId } = req.params;
            await deleteSubCategory(subCategoryId);
            return res.status(200).json({
                success: true,
                message: "Subcategory deleted successfully"
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to delete subcategory"
            });
        }
    },

    // Product CRUD
    getAllProducts: async (req, res) => {
        try {
            const products = await getAllProducts();
            return res.status(200).json({
                success: true,
                data: products
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || "Failed to fetch products"
            });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await updateProduct(productId, req.body, req.files);
            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: product
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to update product"
            });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { productId } = req.params;
            await deleteProduct(productId);
            return res.status(200).json({
                success: true,
                message: "Product deleted successfully"
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to delete product"
            });
        }
    },

    // Order Management
    getAllOrders: async (req, res) => {
        try {
            const orders = await getAllOrdersAdmin();
            return res.status(200).json({
                success: true,
                data: orders
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || "Failed to fetch orders"
            });
        }
    },

    updateOrderStatus: async (req, res) => {
        try {
            const { orderId } = req.params;
            const { status } = req.body;
            const order = await updateOrderStatus(orderId, status);
            return res.status(200).json({
                success: true,
                message: "Order status updated successfully",
                data: order
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to update order status"
            });
        }
    },

    // User Management
    getAllUsers: async (req, res) => {
        try {
            const users = await getAllUsers();
            return res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || "Failed to fetch users"
            });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await updateUser(userId, req.body);
            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: user
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to update user"
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            await deleteUser(userId);
            return res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to delete user"
            });
        }
    }
};

export default adminController;