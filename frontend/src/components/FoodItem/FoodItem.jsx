import React, { useContext } from "react";
import { motion } from "framer-motion";
import { StoreContext } from "../../context/StoreContext";
import {
  Plus,
  Minus,
  Star,
  ShoppingBag,
} from "lucide-react";

const ProductItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      whileHover={{
        scale: 1.04,
        rotateX: 4,
        boxShadow:
          "0px 20px 40px rgba(0,0,0,0.45), 0px 0px 25px rgba(99,102,241,0.25)",
      }}
      className="w-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg p-4 flex flex-col space-y-4 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative w-full h-56 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.25)]"
      >
        <img
          src={url + "/images/" + image}
          alt={name}
          className="w-full h-full object-cover transition-all duration-700"
        />

        {/* Add/Counter */}
        {!cartItems[id] ? (
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.88 }}
            onClick={() => addToCart(id)}
            className="absolute bottom-3 right-3 bg-white text-black p-3 rounded-full shadow-xl border border-white/20 backdrop-blur-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition"
          >
            <Plus size={20} />
          </motion.button>
        ) : (
          <div className="absolute bottom-3 right-3 flex items-center gap-3 bg-black/40 backdrop-blur-lg border border-white/20 px-3 py-1 rounded-full shadow-lg">
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => removeFromCart(id)}>
              <Minus size={20} className="text-white" />
            </motion.button>

            <p className="text-white font-semibold">{cartItems[id]}</p>

            <motion.button whileTap={{ scale: 0.85 }} onClick={() => addToCart(id)}>
              <Plus size={20} className="text-white" />
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Info */}
      <div className="flex flex-col space-y-2">
        {/* Name + rating */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold tracking-wide">{name}</p>

          <div className="flex items-center gap-1 text-indigo-400">
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Price */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-xl font-bold text-indigo-400 tracking-wide drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]">
            ₹{price}
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="px-4 py-2 rounded-full bg-white text-black font-semibold flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition"
          >
            <ShoppingBag size={18} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductItem;
