import mongoose from "mongoose";
import { ref } from "node:process";

const UserOrderSchema = new mongoose.Schema({
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },

  Products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required : true
      },
      Quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  User : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
  },

  TotalAmount : {
    type : Number,
    required : true
  },

  TotalDiscount : {
    type : Number,
  },

  Address : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "UserAddress",
    required : true
  }

});

export default mongoose.model("Order" , UserOrderSchema)