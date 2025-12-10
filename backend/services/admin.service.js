import Category from "../models/category.model.js";
import SubCategory from "../models/subcategory.model.js";
import Product from "../models/product.model.js";
import Cupon from "../models/cupon.model.js";
import Banner from "../models/banner.model.js";
import uploadTheImage from "../utils/cloudinary.js";
import { uploadMultipleImages } from "../utils/cloudinary.js";
import fs from "fs";

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
