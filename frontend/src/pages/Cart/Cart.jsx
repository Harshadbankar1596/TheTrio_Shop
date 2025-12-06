import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, MapPin, Loader } from "lucide-react";
import {
  useGetCartItemsQuery,
  useRemoveCartItemMutation,
} from "../../redux/Admin/userAPI";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";

export default function TheTrioCart() {
  const user = useSelector((state) => state.user);
  const userId = user?.id || user?._id;
  const [removeitem, { isLoading: loadingcart }] = useRemoveCartItemMutation();
  const [ItemLoader, setItemLoader] = useState(null);

  const { data, isLoading } = useGetCartItemsQuery(userId, { skip: !userId });

  const navigate = useNavigate();

  const addresses = data?.address ?? [];
  const rawItems = data?.data?.items ?? [];

  const items = rawItems.map((x) => ({
    product: x.product,
    quantity: x.quantity ?? 1,
    size: x.size,
    _id: x._id,
  }));

  // 🔴 CHECK FOR INACTIVE PRODUCTS
  const hasInactive = items.some(x => x.product?.isActive === false);

  const subtotal = items.reduce(
    (acc, x) => acc + (x.product.finalPrice ?? x.product.price) * x.quantity,
    0
  );

  const originalTotal = items.reduce(
    (acc, x) => acc + x.product.price * x.quantity,
    0
  );

  const totalDiscount = Math.max(0, originalTotal - subtotal);
  const delivery = subtotal > 0 ? 40 : 0;
  const total = subtotal + delivery;

  const format = (n) =>
    n.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.06 },
    }),
    hover: { scale: 1.02, boxShadow: "0 20px 40px rgba(99,102,241,0.25)" },
  };

  async function removeitems(cartId) {
    try {
      const res = await removeitem({ userId, cartId });
      if (res.error) {
        toast.error("Error removing item");
        return;
      }
      toast.success("Item Removed");
    } catch (error) {
      toast.error("Error removing item");
    }
  }

  if (isLoading)
    return <div className="text-center mt-20 text-white">Loading cart...</div>;

  return (
    <div className="w-full px-6 md:px-16 mt-16 text-white">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/50 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl rounded-2xl p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <ShoppingBag size={20} className="text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Your Cart</h3>
              <p className="text-white/60 text-sm">Luxury fashion items</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-white/60">Subtotal</p>
            <p className="text-lg font-semibold">{format(subtotal)}</p>
          </div>
        </div>

        {/* GLOBAL WARNING IF INACTIVE ITEMS EXIST */}
        {hasInactive && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-400/20 rounded-xl text-rose-400 text-sm text-center">
            Some items in your cart are <span className="font-semibold">OUT OF STOCK</span>.
            Please remove them to continue checkout.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT SIDE CART LIST */}
          <div className="lg:col-span-8 space-y-5">
            {items.length === 0 ? (
              <div className="text-center py-10 text-white/60">
                Your cart is empty.{" "}
                <Link className="text-indigo-400 underline" to="/">
                  Browse Products
                </Link>
              </div>
            ) : (
              items.map((x, i) => (
                <motion.div
                  key={x._id}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  variants={fadeUp}
                  className={`p-4 rounded-2xl backdrop-blur-md grid grid-cols-3 md:grid-cols-6 items-center gap-4 
                    ${
                      x.product?.isActive === false
                        ? "bg-rose-500/10 border border-rose-400/20"
                        : "bg-white/5 border border-white/10"
                    }
                  `}
                >
                  {/* Image */}
                  <Link to={`/product/${x.product._id}`} className="col-span-1">
                    <img
                      src={x.product.images[0]}
                      className="w-24 h-24 rounded-xl object-cover hover:scale-105 transition"
                      alt=""
                    />
                  </Link>

                  {/* Title */}
                  <div className="col-span-2">
                    <p className="font-medium">{x.product.title}</p>

                    {/* SHOW OUT OF STOCK LABEL */}
                    {x.product?.isActive === false && (
                      <p className="text-xs text-rose-400 font-semibold mt-1">
                        OUT OF STOCK
                      </p>
                    )}

                    <p className="text-xs text-white/60">Size: {x.size}</p>
                    <p className="text-xs text-white/60">Quantity: {x.quantity}</p>
                  </div>

                  <div className="hidden md:block text-right text-white/70">
                    {format(x.product.finalPrice)}
                  </div>

                  <div className="font-semibold text-white text-right md:text-left">
                    {format(x.product.finalPrice * x.quantity)}
                  </div>

                  {/* Remove Button */}
                  <div className="text-right flex items-center justify-center">
                    {loadingcart && ItemLoader === x._id ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <button
                        onClick={() => {
                          removeitems(x._id);
                          setItemLoader(x._id);
                        }}
                        className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20"
                      >
                        <Trash2 size={16} className="text-rose-400" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* RIGHT SIDE SUMMARY */}
          <div className="lg:col-span-4 space-y-6">
            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-lg"
            >
              <h3 className="text-white/80 text-sm">Order Summary</h3>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span> <span>{format(subtotal)}</span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>Discount</span> <span>-{format(totalDiscount)}</span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>Delivery Fee</span> <span>{format(delivery)}</span>
                </div>

                <div className="flex justify-between text-white text-lg font-semibold">
                  <span>Total</span> <span>{format(total)}</span>
                </div>

                {/* PLACE ORDER BUTTON — DISABLED IF INACTIVE ITEMS */}
                <motion.button
                  whileHover={!hasInactive ? { scale: 1.03 } : {}}
                  whileTap={!hasInactive ? { scale: 0.97 } : {}}
                  disabled={hasInactive}
                  onClick={() =>
                    !hasInactive &&
                    navigate("/order", {
                      state: { items, subtotal, total, delivery , totalDiscount , cuponCode : 0},
                    })
                  } 
                  className={`w-full mt-4 py-3 rounded-full font-semibold transition 
                    ${
                      hasInactive
                        ? "bg-gray-600 cursor-not-allowed text-white/40"
                        : "bg-green-400 text-black shadow-green-500"
                    }
                  `}
                >
                  {hasInactive ? "REMOVE OUT OF STOCK ITEMS" : "PLACE ORDER"}
                </motion.button>
              </div>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-black/30 border border-white/10"
            >
              <h4 className="text-sm text-white/70 mb-3 flex items-center gap-2">
                <MapPin size={16} /> Delivery Address
              </h4>

              {addresses.length > 0 ? (
                <div className="text-white/70 text-sm">
                  <p className="font-medium text-white">
                    {addresses[0]?.addressLine1}
                  </p>
                  <p>{addresses[0]?.addressLine2}</p>
                  <p>
                    {addresses[0]?.city}, {addresses[0]?.state} -{" "}
                    {addresses[0]?.postalCode}
                  </p>

                  <p className="text-xs text-white/50 mt-2">
                    Delivered in <span className="text-indigo-300">7 days</span>
                  </p>
                </div>
              ) : (
                <p className="text-white/60 text-sm">
                  No address added.{" "}
                  <Link to="/profile" className="text-indigo-300 underline">
                    Add now
                  </Link>
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
