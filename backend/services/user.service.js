import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Banner from "../models/banner.model.js";
import category from "../models/category.model.js";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import UserAddress from "../models/useraddress.model.js";
import Review from "../models/review.model.js";

export const createUser = async (data) => {
  if (!data.email || !data.password || !data.name || !data.phone) {
    throw new Error("Missing required fields");
  }
  data.password = await bcrypt.hash(data.password, 10);
  return await User.create(data);
};

export const findUserByEmail = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  return user;
};

export const getBannerByName = async (name) => {
  return await Banner.findOne({ name: name });
};

export const getAllCategories = async () => {
  return await category.find();
};

export const getProductsByCategory = async (categoryId) => {
  return await Product.find({ category: categoryId }).populate(
    "category subCategory"
  );
};

export const getProductById = async (productId) => {
  return await Product.findById(productId).populate("category subCategory");
};

export const addcartitem = async (userId, productId, quantity) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [{ product: productId, quantity }],
    });
    return cart;
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId.toString()
  );

  if (existingItem) {
    existingItem.quantity = quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  return cart;
};

export const getCartByUserId = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  return await Cart.findOne({ user: userId }).populate("items.product");
};

export const createUserAddress = async (userId, AddressData) => {
  if (!userId || !AddressData) {
    throw new Error("All Feald's Are requred");
  }
  const address = await UserAddress.create({
    user: userId,
    addressLine1: AddressData.addressLine1,
    addressLine2: AddressData.addressLine2,
    city: AddressData.city,
    state: AddressData.state,
    postalCode: AddressData.postalCode,
  });
  if (!address) {
    throw new Error("error on creating address");
  }
  return address;
};

export const GetAllAdsress = async (userId) => {
  if (!userId) {
    throw new Error("userId not found");
  }
  const address = await UserAddress.find({ user: userId }).lean();
  // if(!address) {
  //   throw new Error("address not found")
  // }
  return address;
};

export const RemoveCart = async (userId, cartItemId) => {
  if (!userId || !cartItemId) {
    throw new Error("User ID and Cart Item ID are required");
  }
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new Error("Cart not found for this user");
  }
  cart.items = cart.items.filter(
    (item) => item._id.toString() !== cartItemId.toString()
  );
  await cart.save();
  return cart;
};

export const CreateReview = async (user, ProductId, Rating, Description) => {
  if (!user || !Rating || !Description) {
    throw new Error("All Fields Are Require");
  }

  const review = await Review.create({
    User: user,
    Product: ProductId,
    Rating,
    Description,
  });

  if (!review) {
    throw new Error("Error in save");
  }
  const product = await Product.findByIdAndUpdate(
    ProductId,
    { $inc: { rating: 1 } },
    { new: true }
  );

  console.log(product);

  if (!product) {
    throw new Error("Product not found");
  }

  return review;
};

export const GetReview = async (ProductId) => {
  if (!ProductId) {
    throw new Error("Product Id invalid");
  }
  const review = await Review.find({ Product: ProductId });
  if (!review) {
    throw new Error("Review Not Found");
  }
  return review;
};
