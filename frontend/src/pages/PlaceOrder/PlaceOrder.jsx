import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useGetAllAddressQuery } from "../../redux/Admin/userAPI";
import AddAddressModal from "./addaddress";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useSelector((s) => s.user);

  // Add Address Modal State
  const [showAddAddress, setShowAddAddress] = useState(false);

  // Read state OR auto calculate if missing
  let { items, subtotal, total, delivery } = state || {};

  if (items?.length && (!subtotal || !total)) {
    subtotal = items.reduce(
      (sum, x) => sum + x.product.finalPrice * x.quantity,
      0
    );
    delivery = delivery ?? 40;
    total = subtotal + delivery;
  }

  // Fetch Address List
  const { data } = useGetAllAddressQuery({ userId: user.id });

  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (data?.Address?.length > 0) {
      setSelectedAddress(data.Address[0]);
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

  const startPayment = async () => {
    if (!items?.length) return toast.error("No items found");
    if (!selectedAddress) return toast.error("Please select an address");

    const loaded = await loadRazorpayScript();
    if (!loaded) return toast.error("Razorpay failed to load");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/checkoutpayment",
        {
          userId: user.id,
          products: items.map((x) => ({
            productId: x.product._id,
            quantity: x.quantity,
          })),
          userAddressId: selectedAddress._id,
          subtotal,
          delivery,
          total,
        }
      );

      const order = data.order;

      const options = {
        key: "rzp_test_Rn8IK6gWbfPl97",
        amount: order.amount * 100,
        currency: "INR",
        name: "The Trio Shop",
        description: "Order Payment",
        order_id: order.id,

        handler: function (response) {
          toast.success("Payment Successful!");
          navigate("/order-success", {
            state: {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
            },
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

      {/* ADDRESS SECTION */}
      <div className="bg-black/40 p-4 rounded-xl border border-white/10 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Select Delivery Address</h2>

          {/* ADD ADDRESS BUTTON */}
          <button
            onClick={() => setShowAddAddress(true)}
            className="px-3 py-1.5 bg-indigo-500 text-black rounded-lg font-semibold hover:bg-indigo-400 transition"
          >
            + Add Address
          </button>
        </div>

        {data?.Address?.length > 0 ? (
          <div className="grid gap-4">
            {data.Address.map((addr) => (
              <div
                key={addr._id}
                onClick={() => setSelectedAddress(addr)}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  selectedAddress?._id === addr._id
                    ? "border-indigo-500 bg-indigo-500/20"
                    : "border-white/20 bg-white/10"
                }`}
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
          <p className="text-white/60">No address found.</p>
        )}
      </div>

      {/* ORDER SUMMARY */}
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

      {/* ADD ADDRESS MODAL */}
      {showAddAddress && (
        <AddAddressModal onClose={() => setShowAddAddress(false)} />
      )}
    </div>
  );
};

export default PlaceOrder;