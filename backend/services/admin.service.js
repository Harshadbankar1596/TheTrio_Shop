import Category from "../models/category.model.js";
import SubCategory from "../models/subcategory.model.js";
import Product from "../models/product.model.js";
import Cupon from "../models/cupon.model.js";
import Banner from "../models/banner.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Admin from "../models/admin.model.js";
import uploadTheImage from "../utils/cloudinary.js";
import { uploadMultipleImages } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";
import fs from "fs";
import validator from "validator";

export const createCategory = async (data, imagepath) => {
  if (!data.name || !imagepath) {
    throw new Error("Name and Image are required to create a category");
  }
  let imageUrl = null;
  if (imagepath) {
    const uploadResult = await uploadTheImage(imagepath);
    imageUrl = uploadResult?.secure_url;
    fs.unlinkSync(imagepath);
  }
  data.image = imageUrl;
  return await Category.create(data);
};

export const createSubCategory = async (data, imagepath) => {
  if (!data.name || !data.category || !imagepath) {
    throw new Error(
      "Name, Category ID, and Image are required to create a sub-category"
    );
  }
  let imageUrl = null;
  if (imagepath) {
    const uploadResult = await uploadTheImage(imagepath);
    imageUrl = uploadResult?.secure_url;
    fs.unlinkSync(imagepath);
  }
  data.image = imageUrl;

  return await SubCategory.create(data);
};

export const getAllCategories = async () => {
  return await Category.find();
};

export const getSubCategoriesByCategoryId = async (categoryId) => {
  if (!categoryId) {
    throw new Error("Category ID is required");
  }
  return await SubCategory.find({ category: categoryId });
};

export const addProduct = async (data, imagesfiles) => {
  const files = imagesfiles;
  if (!files || files.length === 0) {
    throw new Error({
      success: false,
      message: "At least one product image is required",
    });
  }
  const uploadedImages = [];
  for (const file of files) {
    const uploaded = await uploadTheImage(file.path);
    uploadedImages.push(uploaded.secure_url);

    // Delete local file after upload
    fs.unlinkSync(file.path);
  }

  data.images = uploadedImages;
  const required = [
    "title",
    "description",
    "category",
    "subCategory",
    "price",
    "discount",
    "images",
    "sizes",
    "colors",
    "stock",
  ];
  required.forEach((field) => {
    if (!data[field]) {
      throw new Error(`${field} is required to add a product`);
    }
  });
  const discount = data.discount || 0;
  data.finalPrice = Math.floor(data.price - data.price * (discount / 100));
  return await Product.create(data);
};

export const createCupon = async (data) => {
  const { code, discount, expirationDate, usageLimit } = data;
  if (!code || !discount || !expirationDate || !usageLimit) {
    throw new Error(
      "Code, Discount, Expiration Date, and Usage Limit are required to create a coupon"
    );
  }
  return await Cupon.create(data);
};

export const createBanner = async (data) => {
  if (!data.name || !data.image) {
    throw new Error("Name and Image are required to create a banner");
  }
  return await Banner.create(data);
};

// Admin Authentication
export const createAdmin = async (data) => {
  if (!data.email || !data.password || !data.name) {
    throw new Error("Missing required fields");
  }
  if (!validator.isEmail(data.email)) {
    throw new Error("Invalid email address");
  }
  data.password = await bcrypt.hash(data.password, 10);
  return await Admin.create(data);
};

export const findAdminByEmail = async (email, password) => {
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Error("Admin not found");
  }
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  return admin;
};

// Category CRUD
export const updateCategory = async (categoryId, data, imagepath) => {
  if (imagepath) {
    const uploadResult = await uploadTheImage(imagepath);
    data.image = uploadResult?.secure_url;
    fs.unlinkSync(imagepath);
  }
  return await Category.findByIdAndUpdate(categoryId, data, { new: true });
};

export const deleteCategory = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId);
};

// SubCategory CRUD
export const updateSubCategory = async (subCategoryId, data, imagepath) => {
  if (imagepath) {
    const uploadResult = await uploadTheImage(imagepath);
    data.image = uploadResult?.secure_url;
    fs.unlinkSync(imagepath);
  }
  return await SubCategory.findByIdAndUpdate(subCategoryId, data, { new: true });
};

export const deleteSubCategory = async (subCategoryId) => {
  return await SubCategory.findByIdAndDelete(subCategoryId);
};

// Product CRUD
export const updateProduct = async (productId, data, imagesfiles) => {
  if (imagesfiles && imagesfiles.length > 0) {
    const uploadedImages = [];
    for (const file of imagesfiles) {
      const uploaded = await uploadTheImage(file.path);
      uploadedImages.push(uploaded.secure_url);
      fs.unlinkSync(file.path);
    }
    data.images = uploadedImages;
  }
  if (data.discount !== undefined) {
    const price = data.price || (await Product.findById(productId)).price;
    data.finalPrice = Math.floor(price - price * (data.discount / 100));
  }
  return await Product.findByIdAndUpdate(productId, data, { new: true });
};

export const deleteProduct = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};

export const getAllProducts = async () => {
  return await Product.find().populate("category subCategory").sort({ createdAt: -1 });
};

// Order Management
export const getAllOrdersAdmin = async () => {
  return await Order.find()
    .populate("User")
    .populate("Address")
    .populate("Products.product")
    .sort({ createdAt: -1 });
};

export const updateOrderStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { DeliveryStatus: status },
    { new: true }
  ).populate("User Address Products.product");
};

// User Management
export const getAllUsers = async () => {
  return await User.find().select("-password").sort({ createdAt: -1 });
};

export const updateUser = async (userId, data) => {
  return await User.findByIdAndUpdate(userId, data, { new: true }).select("-password");
};

export const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};
