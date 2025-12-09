import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// Lucide Icons
import { CheckCircle, Calendar, CreditCard, User, MapPin, Tag } from "lucide-react";

import successGif from "../../../public/success.gif"; // <-- your success animation

const Success = () => {
  const { state } = useLocation();
  const obj = state || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // SEND ORDER TO BACKEND
  useEffect(() => {
    async function verifyOrder() {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/verify-payment`,
          {
            razorpay_order_id: obj.orderId,
            razorpay_payment_id: obj.paymentId,
            razorpay_signature: obj.signature,
            TotalAmount: obj.TotalAmount,
            TotalDiscount: obj.TotalDiscount,
            userId: obj.User.id,
            addressId: obj.Address._id,
            Products: obj.Products,
            PaymentType: obj.paymenttype,
            CuponCode: obj.cuponCode || null,
          }
        );

        if (res.data?.error) {
          toast.error("Payment verification failed");
        } else {
          toast.success("Order Placed Successfully");
        }
      } catch (error) {
        toast.error("Error placing order");
      }
    }

    if (obj?.orderId) verifyOrder();
  }, []);

  const date = new Date().toDateString();

  return (
    <div className="min-h-screen bg-[#eef2f7] px-4 py-10 flex justify-center text-gray-900">
      <div className="w-full max-w-3xl">

        {/* ✓ SUCCESS ICON + TEXT */}
        <div className="flex flex-col items-center mb-8">
          <img src={successGif} alt="Success" className="w-32 h-32" />

          <h1 className="text-3xl font-bold mt-4 text-green-600 flex items-center gap-2">
            <CheckCircle size={32} /> Payment Success
          </h1>

          <p className="text-gray-500 mt-1">
            You have successfully placed your order.
          </p>

          <Link
            to="/account"
            className="mt-3 text-indigo-600 underline text-sm"
          >
            Back to Account Settings
          </Link>
        </div>

        {/* PAYMENT SUMMARY CARD */}
        <div className="
          bg-white 
          shadow-xl 
          rounded-3xl 
          p-6 
          border border-gray-200
        ">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-indigo-600 flex items-center gap-1">
                <Tag size={20} className="text-yellow-500" />
                Order Summary
              </h2>
              <p className="text-gray-500 text-sm">Order ID: {obj.orderId}</p>
            </div>
            <span className="px-4 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
              Paid {obj.TotalAmount} ₹
            </span>
          </div>

          {/*  DETAILS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">

            {/* Transaction ID */}
            <div>
              <p className="text-xs text-gray-500">Transaction ID</p>
              <p className="font-semibold">{obj.paymentId}</p>
            </div>

            {/* Invoice */}
            <div>
              <p className="text-xs text-gray-500">Payment Method</p>
              <p className="font-semibold capitalize flex items-center gap-2">
                <CreditCard size={16} /> {obj.paymenttype}
              </p>
            </div>

            {/* Date */}
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-semibold flex items-center gap-2">
                <Calendar size={16} /> {date}
              </p>
            </div>

            {/* User */}
            <div>
              <p className="text-xs text-gray-500">Customer</p>
              <p className="font-semibold flex items-center gap-2">
                <User size={16} /> {obj.User?.name}
              </p>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="mt-6">
            <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
            <div className="flex items-start gap-2 text-sm">
              <MapPin size={18} className="text-red-500 mt-1" />
              <p className="font-medium">
                {obj.Address?.addressLine1}, {obj.Address?.addressLine2},<br />
                {obj.Address?.city}, {obj.Address?.state} - {obj.Address?.postalCode}
              </p>
            </div>
          </div>

          {/* TOTAL */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
            <p className="font-semibold">Total Paid</p>
            <p className="font-bold text-green-600 text-lg">₹{obj.TotalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
