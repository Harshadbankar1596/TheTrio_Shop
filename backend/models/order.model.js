import mongoose from "mongoose";

const UserOrderSchema = new mongoose.Schema(
  {
    razorpay_payment_id: {
      type: String,
    },
    razorpay_order_id: {
      type: String,
    },
    PaymentType: {
      type: String,
      required: true,
    },

    cuponCode: {
      type: String,
      default: "",
    },

    Products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
      },
    ],

    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    TotalAmount: {
      type: Number,
      required: true,
    },

    TotalDiscount: {
      type: Number,
    },

    Address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAddress",
      required: true,
    },

    DeliveryStatus: {
      type: String,
      enum: [
        "Placed",
        "Packed",
        "Shipped",
        "OutForDelivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },

    isCancel: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", UserOrderSchema);
