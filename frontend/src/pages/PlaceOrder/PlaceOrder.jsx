import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useGetAllAddressQuery } from "../../redux/Admin/userAPI";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useSelector((s) => s.user);
  const { items, subtotal, delivery, total } = state || {};

  // Fetch Address List from API
  const { data } = useGetAllAddressQuery({ userId: user.id });

  // Selected Address
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Set default address after data loads
  useEffect(() => {
    if (data?.Address?.length > 0) {
      setSelectedAddress(data.Address[0]); // default first address
    }
  }, [data]);

  // Load Razorpay Script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Payment Handler
  const startPayment = async () => {
    if (!items?.length) return toast.error("No items found");
    if (!selectedAddress) return toast.error("Please select an address");

    const loaded = await loadRazorpayScript();
    if (!loaded) return toast.error("Razorpay SDK failed to load");

    try {
      // Backend → Create order
      const { data } = await axios.post(
        "http://localhost:5000/api/user/checkoutpayment",
        {
          userId: user.id,
          products: items.map((x) => ({
            productId: x.product._id,
            quantity: x.quantity,
          })),
          userAddressId: selectedAddress._id, // ✔ send selected address id
        }
      );

      const order = data.order;

      const options = {
        key: "rzp_test_Rn8IK6gWbfPl97",
        amount: order.amount,
        currency: "INR",
        name: "The Trio Shop",
        description: "Order Payment",
        order_id: order.id,
        // timeout: 100000,

        handler: function (response) {
          toast.success("Payment Successful!");
          navigate("/order-success", {
            state: { orderId: response.razorpay_order_id, paymentId: response.razorpay_payment_id },
          });
        },

        theme: { color: "#151b24" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-semibold mb-6">Review Your Order</h1>

      {/* Address Selection */}
      <div className="bg-black/40 p-4 rounded-xl border border-white/10 mb-6">
        <h2 className="text-lg mb-4 font-semibold">Select Delivery Address</h2>

        {data?.Address?.length > 0 ? (
          <div className="grid gap-4">
            {data.Address.map((addr) => (
              <div
                key={addr._id}
                onClick={() => setSelectedAddress(addr)}
                className={`p-4 rounded-xl border cursor-pointer transition 
                ${selectedAddress?._id === addr._id 
                  ? "border-indigo-500 bg-indigo-500/20" 
                  : "border-white/20 bg-white/10"}`}
              >
                <p className="font-semibold">{addr.addressLine1}</p>
                <p>{addr.addressLine2}</p>
                <p>
                  {addr.city}, {addr.state} - {addr.postalCode}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No address found. Add one in Profile.</p>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-black/40 p-4 rounded-xl border border-white/10">
        <p>Total Items: {items?.length}</p>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Delivery: ₹{delivery}</p>
        <p className="font-bold text-xl mt-2">Grand Total: ₹{total}</p>

        <button
          onClick={startPayment}
          className="mt-6 px-5 py-3 bg-indigo-500 rounded-lg text-black font-semibold w-full"
        >
          Pay Now ₹{total}
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
