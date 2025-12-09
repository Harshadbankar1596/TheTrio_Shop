import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useGetAllAddressQuery,
  useVerifyCuponMutation,
} from "../../redux/Admin/userAPI";
import AddAddressModal from "./addaddress";
import { CreditCard, Truck, Loader2 } from "lucide-react";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const user = useSelector((s) => s.user);

  // COUPON STATES
  const [couponCode, setCouponCode] = useState("");
  const [verifiedCoupon, setVerifiedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Trigger coupon API on click
  const [verifyCupon, { isLoading: loadingcupon }] = useVerifyCuponMutation();

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  let { items, subtotal, total, delivery, totalDiscount } = state || {};
  // console.log(totalDiscount);

  // PRICE CALCULATION
  if (items?.length && (!subtotal || !total)) {
    subtotal = items.reduce(
      (sum, x) => sum + x.product.finalPrice * x.quantity,
      0
    );
    delivery = delivery ?? 40;
    total = subtotal + delivery;
  }

  // ADDRESS FETCH
  const { data } = useGetAllAddressQuery({ userId: user.id });
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (data?.Address?.length > 0) {
      setSelectedAddress(data.Address[0]);
    }
  }, [data]);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);


  // APPLY COUPON HANDLER
  const applyCoupon = async () => {
    console.log(couponCode);

    if (!couponCode) return toast.error("Please enter a coupon code");

    const res = await verifyCupon({ Code: couponCode });

    if (res.error) {
      setVerifiedCoupon(null);
      setDiscountAmount(0);
      return toast.error("Invalid or expired coupon");
    }

    const coupon = res.data?.cupon?.[0];

    if (!coupon) {
      setVerifiedCoupon(null);
      setDiscountAmount(0);
      return toast.error("Invalid coupon");
    }

    setVerifiedCoupon(coupon);

    // Calculate discount amount
    const discount = Math.floor((subtotal * coupon.discount) / 100);
    setDiscountAmount(discount);

    toast.success(`Coupon Applied! You saved ₹${discount}`);
  };

  const finalTotal = total - discountAmount;

  // Razorpay Script Loader
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

  // PAYMENT HANDLER
  const startPayment = async () => {
    if (!items?.length) return toast.error("No items found");
    if (!selectedAddress)
      return toast.error("Please select a delivery address");

    if (paymentMethod === "cod") {
      toast.success("Order Placed (Cash on Delivery)");
      navigate("/success", {
        state: {
          // orderId: "COD-" + new Date().getTime(),
          paymenttype: "COD",
          Products: items,
          User: user,
          TotalAmount: finalTotal,
          TotalDiscount: totalDiscount,
          Address: selectedAddress,
          couponCode: verifiedCoupon || null,
        },
      });
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) return toast.error("Razorpay failed to load");

    try {
      setLoading(true);
      const { data } = await axios.post(
        // "http://localhost:5000/api/user/checkoutpayment",
        `${import.meta.env.VITE_BACKEND_URL}/user/checkoutpayment`,
        {
          userId: user.id,
          products: items.map((x) => ({
            productId: x.product._id,
            quantity: x.quantity,
          })),
          userAddressId: selectedAddress._id,
          subtotal,
          delivery,
          total: finalTotal,
        }
      );

      const order = data.order;
      setLoading(false);
      const options = {
        key: "rzp_test_Rn8IK6gWbfPl97",
        amount: order.amount * 100,
        currency: "INR",
        name: "The Trio Shop",
        description: "Order Payment",
        order_id: order.id,
        theme: { color: "#00c853" },

        handler: function (response) {
          setLoading(false);
          toast.success("Payment Successful!");

          navigate("/success", {
            state: {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              paymenttype: "razorpay",
              Products: items,
              User: user,
              TotalAmount: finalTotal,
              TotalDiscount: totalDiscount,
              Address: selectedAddress,
              couponCode: verifiedCoupon?.code || null,
            },
          });
        },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0e10] text-white p-6 md:p-10">
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-10 text-yellow-400">
        Review Your Order
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT SECTION */}
        <div className="lg:col-span-7 space-y-8">
          {/* ADDRESS */}
          <div className="bg-[#141518] rounded-2xl p-6 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Delivery Address</h2>
              <button
                onClick={() => setShowAddAddress(true)}
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                + Add Address
              </button>
            </div>

            {data?.Address?.length > 0 ? (
              <div className="space-y-4">
                {data.Address.map((addr) => (
                  <div
                    key={addr._id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border text-sm
                      ${
                        selectedAddress?._id === addr._id
                          ? "border-yellow-400 bg-yellow-500/10 shadow-md"
                          : "border-white/10 bg-white/5 hover:border-gray-400"
                      }`}
                  >
                    <p className="font-semibold text-base">
                      {addr.addressLine1}
                    </p>
                    <p>{addr.addressLine2}</p>
                    <p>
                      {addr.city}, {addr.state} - {addr.postalCode}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60">No saved addresses.</p>
            )}
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-[#141518] rounded-2xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Select Payment Method
            </h2>

            <div className="space-y-4">
              {/* ONLINE PAYMENT */}
              <label
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-all
                  ${
                    paymentMethod === "razorpay"
                      ? "border-green-400 bg-green-600/10"
                      : "border-white/10 hover:border-green-400"
                  }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                />
                <CreditCard className="text-green-400" />
                <span className="font-medium">Online Payment (Razorpay)</span>
              </label>

              {/* COD */}
              <label
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-all
                  ${
                    paymentMethod === "cod"
                      ? "border-yellow-400 bg-yellow-500/10"
                      : "border-white/10 hover:border-yellow-400"
                  }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <Truck className="text-yellow-400" />
                <span className="font-medium">Cash on Delivery (COD)</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION — ORDER SUMMARY */}
        <div className="lg:col-span-5 bg-[#141518] rounded-2xl p-6 border border-white/10 shadow-xl h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {/* COUPON INPUT */}
          <div className="mb-5">
            <p className="text-sm text-white/70 mb-2">Have a coupon?</p>

            <div className="flex gap-3">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="
                  flex-1 p-3 rounded-xl bg-white/5 border border-white/10 
                  text-white placeholder-white/40 outline-none
                "
              />

              <button
                onClick={() => applyCoupon()}
                className="px-4 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
              >
                Apply
              </button>
            </div>

            {verifiedCoupon && (
              <p className="text-green-400 mt-2 text-sm">
                Coupon applied: {verifiedCoupon.code} —{" "}
                {verifiedCoupon.discount}% OFF
              </p>
            )}
          </div>

          <div className="space-y-2 text-white/80 text-sm">
            <p>Total Items: {items?.length}</p>
            <p>Subtotal: ₹{subtotal}</p>
            <p>Delivery: ₹{delivery}</p>

            {discountAmount > 0 && (
              <p className="text-green-400 font-medium">
                Coupon Discount: -₹{discountAmount}
              </p>
            )}
          </div>

          <p className="font-bold text-2xl mt-5">
            Grand Total: <span className="text-green-400">₹{finalTotal}</span>
          </p>

          <div className="flex items-center justify-center py-5">
            {loading ? (
              <div
                className="flex items-center justify-center
              mt-6 w-full py-4 rounded-xl font-semibold
              bg-green-500 text-black text-lg tracking-wide
              hover:bg-green-400 active:scale-95 transition"
              >
                <Loader2 className="animate-spin" />
                <p>Loading</p>
              </div>
            ) : (
              <button
                onClick={startPayment}
                className="
              mt-6 w-full py-4 rounded-xl font-semibold
              bg-green-500 text-black text-lg tracking-wide
              hover:bg-green-400 active:scale-95 transition
            "
              >
                {paymentMethod === "cod"
                  ? "Place COD Order"
                  : `Pay Securely ₹${finalTotal}`}
              </button>
            )}
          </div>
        </div>
      </div>

      {showAddAddress && (
        <AddAddressModal onClose={() => setShowAddAddress(false)} />
      )}
    </div>
  );
};

export default PlaceOrder;
