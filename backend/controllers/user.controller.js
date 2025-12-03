import { createUser, findUserByEmail, getAllCategories, getBannerByName, getProductsByCategory, getProductById, addcartitem, getCartByUserId, createUserAddress, GetAllAdsress, RemoveCart } from "../services/user.service.js";
import generateToken from "../utils/generateJWT.js";

const userController = {

  register: async (req, res) => {
    try {
      const user = await createUser(req.body);
      const token = generateToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
      })
      return res.json({
        success: true,
        message: "User registered successfully",
        user,
        token
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Registration failed"
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await findUserByEmail(email, password);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      const token = generateToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
      });
      return res.json({
        success: true,
        message: "Login successful",
        user,
        token
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Login failed"
      });
    }
  },

  getBannerByName: async (req, res) => {
    try {
      const bannerName = req.params.name;
      const banner = await getBannerByName(bannerName);
      if (!banner) {
        return res.status(404).json({
          success: false,
          message: "Banner not found"
        });
      }
      return res.status(200).json({
        success: true,
        data: banner
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch banner"
      });
    }
  },

  getCategory: async (req, res) => {
    try {
      const category = await getAllCategories()
      return res.status(200).json({
        success: true,
        data: category
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch categories"
      });
    }
  },

  getProductBycategory: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;

      const products = await getProductsByCategory(categoryId)

      if (!products || products.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No products found for this category"
        });
      }

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

  getproductById: async (req, res) => {
    try {
      const productid = req.params.productId
      const product = await getProductById(productid)
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      return res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch product"
      });
    }
  },

  addcartitem: async (req, res) => {
    try {
      const cart = await addcartitem(req.body.userId, req.body.productId);
      return res.status(200).json({
        success: true,
        data: cart
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to add item to cart"
      });
    }
  },

  getCartItems: async (req, res) => {
    try {
      const userId = req.params.userId;
      const cartItems = await getCartByUserId(userId);
      const address = await GetAllAdsress(userId);
      return res.status(200).json({
        success: true,
        data: cartItems,
        address: address
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch cart items"
      });
    }
  },

  addAddress: async (req, res) => {
    try {
      const address = await createUserAddress(req.body.userId, req.body.AddressData);
      res.status(200).json({ message: "Sucsess", Address: address })
    } catch (error) {
      res.status(500).json({ message: "Server Error" })
    }
  },

  getAllAddress: async (req, res) => {
    try {
      const address = await GetAllAdsress(req.params.userId)
      res.status(200).json({ message: "sucsess", Address: address })
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error })
    }
  },

  removeCart: async (req, res) => {
    try {
      const cart = await RemoveCart(req.body.userId, req.body.cartId)
      res.status(200).json({ message: "sucsess", Cart: cart })
    } catch (error) {
      res.status(500).json({ mesage: "Server Error" })
    }
  }
};
export default userController;