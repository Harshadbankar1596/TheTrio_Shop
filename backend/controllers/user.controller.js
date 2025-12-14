import dotenv from "dotenv";
dotenv.config();
import {
  createUser,
  findUserByEmail,
  getAllCategories,
  getBannerByName,
  getProductsByCategory,
  getProductById,
  addcartitem,
  getCartByUserId,
  createUserAddress,
  GetAllAdsress,
  RemoveCart,
  CreateReview,
  GetReview,
  verifyCupon,
  removecartItems,
  getAllOrders,
  cancleOrder,
  getnewProducts,
  ProductQuentyty
} from "../services/user.service.js";
import generateToken from "../utils/generateJWT.js";

import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Razorpay from "razorpay";
import crypto from "node:crypto";
import UserAddress from "../models/useraddress.model.js";
import Order from "../models/order.model.js";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const userController = {
  register: async (req, res) => {
    try {
      const user = await createUser(req.body);
      const token = generateToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
      });
      return res.json({
        success: true,
        message: "User registered successfully",
        user,
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
      const user = await findUserByEmail(email, password);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const token = generateToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
      });
      return res.json({
        success: true,
        message: "Login successful",
        user,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Login failed",
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
          message: "Banner not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: banner,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch banner",
      });
    }
  },

  getCategory: async (req, res) => {
    try {
      const category = await getAllCategories();
      return res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch categories",
      });
    }
  },

  getProductBycategory: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;

      const products = await getProductsByCategory(categoryId);

      if (!products || products.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No products found for this category",
        });
      }

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch products",
      });
    }
  },

  getproductById: async (req, res) => {
    try {
      const productid = req.params.productId;
      const product = await getProductById(productid);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch product",
      });
    }
  },

  addcartitem: async (req, res) => {
    try {
      const cart = await addcartitem(
        req.body.userId,
        req.body.productId,
        req.body.quantity,
        req.body.size
      );
      return res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to add item to cart",
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
        address: address,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch cart items",
      });
    }
  },

  addAddress: async (req, res) => {
    try {
      const address = await createUserAddress(
        req.body.userId,
        req.body.AddressData
      );
      res.status(200).json({ message: "Sucsess", Address: address });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  getAllAddress: async (req, res) => {
    try {
      const address = await GetAllAdsress(req.params.userId);
      res.status(200).json({ message: "sucsess", Address: address });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error });
    }
  },

  removeCart: async (req, res) => {
    try {
      const cart = await RemoveCart(req.body.userId, req.body.cartId);
      res.status(200).json({ message: "success", Cart: cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  createReview: async (req, res) => {
    try {
      // console.log(req.body);
      const review = await CreateReview(
        req.body.user,
        req.body.ProductId,
        req.body.Rating,
        req.body.Description
      );
      res.status(200).json({ message: "success", review });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  getReview: async (req, res) => {
    try {
      const review = await GetReview(req.params.ProductId);

      res.status(200).json({ message: "success", review });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Server Error" });
    }
  },

  VerifyCupon: async (req, res) => {
    try {
      const cupon = await verifyCupon(req.body.Code);
      res.status(200).json({ message: "Sucsess", cupon });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  // CheckOutPayment: async (req, res) => {
  //   try {
  //     const { products, userId, userAddressId, cuponCode, total, subtotal } =
  //       req.body;
  //     if (!products || !userId || !userAddressId) {
  //       return res.status(404).json({ message: "All Fields Are Required" });
  //     }

  //     const user = await User.findById(userId).lean();
  //     if (!user) {
  //       return res.status(400).json({ message: "User Not Found" });
  //     }
  //     const address = await UserAddress.findById(userAddressId).lean();
  //     if (!address) {
  //       return res.status(400).json({ message: "Address not found" });
  //     }
  //     let cuponCodeDiscount = 0;
  //     if (cuponCode) {
  //       const cupon = await verifyCupon(cuponCode);
  //       cuponCodeDiscount = cupon.discount;
  //     }

  //     // let amountInPaise = 0;

  //     // for (let item of products) {
  //     //   const product = await Product.findById(item.productId);
  //     //   if (!product) {
  //     //     return res.status(404).json({ message: "Product not found" });
  //     //   }

  //     //   const total = product.finalPrice * item.quantity;
  //     //   amountInPaise += total * 100;
  //     // }

  //     // if (amountInPaise < 100) {
  //     //   return res.status(400).json({
  //     //     message: "Total amount must be at least Rs.1",
  //     //   });
  //     // }

  //     // let amountInPaise = 0;

  //     // product calculation
  //     for (let item of products) {
  //       const product = await Product.findById(item.productId);
  //       amountInPaise += product.finalPrice * item.quantity * 100;
  //     }

  //     // apply coupon discount
  //     if (cuponCodeDiscount > 0) {
  //       const discountValue = Math.round(
  //         (amountInPaise * cuponCodeDiscount) / 100
  //       );
  //       amountInPaise -= discountValue;
  //     }

  //     // delivery
  //     amountInPaise += 40 * 100;

  //     // validation
  //     if (amountInPaise < 100) {
  //       return res.status(400).json({
  //         message: "Total amount must be at least Rs.1",
  //       });
  //     }

  //     // delavery charjess
  //     amountInPaise += 40 * 100;

  //     const options = {
  //       amount: amountInPaise,
  //       currency: "INR",
  //       notes: { products, user, address },
  //     };

  //     const order = await instance.orders.create(options);

  //     res.status(200).json({
  //       message: "Order created successfully",
  //       order,
  //     });
  //   } catch (error) {}
  // },

  CheckOutPayment: async (req, res) => {
    try {
      
      const { products, userId, userAddressId, cuponCode } = req.body;

      if (!products || !userId || !userAddressId) {
        return res.status(404).json({ message: "All Fields Are Required" });
      }

      // USER
      const user = await User.findById(userId).lean();
      if (!user) return res.status(400).json({ message: "User Not Found" });

      // ADDRESS
      const address = await UserAddress.findById(userAddressId).lean();
      if (!address)
        return res.status(400).json({ message: "Address not found" });

      // COUPON
      let couponDiscountPercent = 0;
      if (cuponCode) {
        const coupon = await verifyCupon(cuponCode);
        couponDiscountPercent = coupon.discount || 0;
      }

      // PRODUCT TOTAL PRICE
      let amountInPaise = 0;

      for (let item of products) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        if(product.stock >= item.quantity){
          return res.status(404).json({message : "Product Quentyty Is Low"})
        }
        amountInPaise += product.finalPrice * item.quantity * 100;
      }
      
      // APPLY COUPON
      if (couponDiscountPercent > 0) {
        const discountValue = Math.round(
          (amountInPaise * couponDiscountPercent) / 100
        );
        amountInPaise -= discountValue;
      }

      // ADD DELIVERY ONCE (40 rupees)
      amountInPaise += 40 * 100;

      // VALIDATION
      if (amountInPaise < 100) {
        return res.status(400).json({
          message: "Total amount must be at least Rs.1",
        });
      }

      // RAZORPAY ORDER
      const options = {
        amount: amountInPaise,
        currency: "INR",
        notes: { products, user, address },
      };

      const order = await instance.orders.create(options);

      res.status(200).json({
        message: "Order created successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  },
  
  VerifyPayment: async (req, res) => {
    
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        TotalAmount,
        TotalDiscount,
        userId,
        addressId,
        Products,
        PaymentType,
        CuponCode,
      } = req.body;
      
      // console.log(req.body);
      
      
      if (
        !TotalAmount ||
        !TotalDiscount ||
        !userId ||
        !addressId ||
        !Products ||
        !PaymentType
      ) {
        return res.status(400).json({ message: "All Fields Are Required" });
      }
      
      const call = await ProductQuentyty(Products)
      const cart = await removecartItems({ userId });
      // console.log("cart =>", cart);

      if (PaymentType === "COD") {
        const order = await Order.create({
          PaymentType: "COD",
          cuponCode: CuponCode || "",
          Products,
          User: userId,
          TotalAmount,
          TotalDiscount,
          Address: addressId,
          paymentStatus: "Pending",
          razorpay_order_id: undefined,
          razorpay_payment_id: undefined,
          razorpay_signature: undefined,
        });

        return res.status(200).json({
          message: "Order Placed Successfully (COD)",
          order,
        });
      }

      if (PaymentType === "razorpay") {
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
          return res
            .status(400)
            .json({ message: "Razorpay Payment Details Required" });
        }

        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSign = crypto
          .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
          .update(sign)
          .digest("hex");

        if (razorpay_signature !== expectedSign) {
          return res
            .status(400)
            .json({ message: "Payment verification failed" });
        }

        const order = await Order.create({
          razorpay_payment_id,
          razorpay_order_id,
          PaymentType,
          cuponCode: CuponCode || "",
          Products,
          User: userId,
          TotalAmount,
          TotalDiscount,
          Address: addressId,
          paymentStatus: "Paid",
        });

        return res.status(200).json({
          message: "Order Successful (Online Payment)",
          order,
        });
      }


      return res.status(400).json({ message: "Invalid Payment Type" });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Server Error", Error: error });
    }
  },

  GetOrders: async (req, res) => {
    try {
      const orders = await getAllOrders(req.params.userId);
      res.status(200).json({ message: "Success", Orders: orders });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Server Error" });
    }
  },

  CancleOrder: async (req, res) => {
    try {
      const order = await cancleOrder(req.body.orderId);
      res.status(200).json({ message: "Succsess", Order: order });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Server Error" });
    }
  },

  GetNewProducts: async (req, res) => {
    try {
      const products = await getnewProducts();
      res.status(200).json({ message: "Success", products });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  },
};
export default userController;