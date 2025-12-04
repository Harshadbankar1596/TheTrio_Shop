import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useAddCartItemMutation,
} from "../../redux/Admin/userAPI";
import Loader from "../../components/Loader";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { StoreContext } from "../../context/StoreContext";
import Review from "./Review.jsx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductByIdQuery(id);
  const [addCartItem, { isLoading: loadingcartadd }] = useAddCartItemMutation();
  const userId = useSelector((user) => user.user.id);
  const product = data?.data || null;

  const [mainIndex, setMainIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setMainIndex(0);
      setSelectedSize(product.sizes?.[0] || "");
      setQty(product.stock && product.stock > 0 ? 1 : 0);
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const format = (n) =>
    Number(n).toLocaleString("en-IN", { style: "currency", currency: "INR" });

  if (isLoading) return <Loader />;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
        <div className="text-center">
          <p className="text-xl">Product not found.</p>
          <Link
            to="/shop"
            className="text-indigo-300 underline mt-4 inline-block"
          >
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const card = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const ratingRounded = Math.round(product.rating || 0);

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-12">
      <motion.div
        initial="hidden"
        animate="show"
        variants={card}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <div className="lg:col-span-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="relative w-full rounded-xl overflow-hidden">
              <motion.img
                src={product.images?.[mainIndex]}
                alt={product.title}
                className="w-full h-[520px] md:h-[540px] object-cover transition-transform duration-700 hover:scale-105"
                whileHover={{ scale: 1.03 }}
              />

              <div className="absolute top-4 left-4 bg-black/60 border border-white/8 px-3 py-2 rounded-full">
                <p className="text-xs text-white/70">Price</p>
                <p className="text-sm font-semibold text-indigo-300">
                  {format(product.finalPrice)}
                </p>
              </div>

              <Link
                to={`/category/${product.category?._id}`}
                className="absolute top-4 right-4 bg-white/5 border border-white/8 px-3 py-2 rounded-full text-sm text-white/70 hover:bg-white/8 transition"
                aria-label={`View category ${product.category?.name}`}
              >
                {product.category?.name}
              </Link>
            </div>

            <div className="flex gap-3 mt-4">
              {product.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainIndex(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border ${
                    i === mainIndex
                      ? "border-indigo-400 scale-105"
                      : "border-white/10"
                  } transition transform`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {product.title}
                </h1>
                <p className="text-sm text-white/60 mt-1 max-w-xl">
                  {product.subCategory?.name} · {product.colors}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      className={
                        idx < ratingRounded
                          ? "text-indigo-400"
                          : "text-white/20"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-white/60">
                  {product.rating?.toFixed(1)}
                </span>
              </div>
            </div>

            {/* description */}
            <p className="mt-4 text-white/70 leading-relaxed">
              {product.description}
            </p>

            {/* price row */}
            <div className="mt-6 flex items-center gap-4">
              <div>
                <p className="text-indigo-300 font-bold text-2xl">
                  {format(product.finalPrice)}
                </p>
                {product.discount > 0 && (
                  <p className="text-white/40 line-through text-sm">
                    ₹{product.price}
                  </p>
                )}
              </div>

              <div className="ml-auto text-sm text-white/60">
                <p>
                  Stock: <span className="text-white">{product.stock}</span>
                </p>
                <p className="mt-1">
                  Discount:{" "}
                  <span className="text-white">{product.discount}%</span>
                </p>
              </div>
            </div>

            {/* size selector & colors */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sizes */}
              <div>
                <p className="text-sm text-white/60 mb-2">Select Size</p>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes?.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-xl border ${
                        selectedSize === s
                          ? "border-indigo-400 bg-indigo-400/10"
                          : "border-white/10"
                      } text-white/90 text-sm transition`}
                      aria-pressed={selectedSize === s}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <p className="text-sm text-white/60 mb-2">Color</p>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
                    {product.colors || "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* quantity + actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl px-3 py-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/8 transition"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <div className="px-4 py-1 bg-transparent text-white font-semibold">
                  {qty}
                </div>
                <button
                  onClick={() =>
                    setQty((q) => Math.min(product.stock || 999, q + 1))
                  }
                  className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/8 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  if (!userId) {
                    toast.error("Please login first!");
                    return;
                  }

                  try {
                    await addCartItem({
                      userId: userId,
                      productId: product._id,
                      quantity: qty,
                    }).unwrap();
                    toast.success("Added to cart successfully!");
                  } catch (err) {
                    console.log(err);
                    alert("Something went wrong!");
                  }
                }}
                className="flex-1 inline-flex items-center justify-center gap-3 px-4 py-3 rounded-full bg-indigo-400 text-black font-semibold"
              >
                <ShoppingBag size={16} /> Add to Cart
              </motion.button>

              {/* Buy now */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 12px 40px rgba(99,102,241,0.12)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // send user to checkout with product id/qty (adjust as your app expects)
                  navigate("/checkout", {
                    state: { productId: product._id, qty, selectedSize },
                  });
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white/5 border border-white/8 text-white font-semibold"
              >
                Buy Now
              </motion.button>
            </div>

            {/* extra product meta */}
            <div className="mt-6 text-sm text-white/60 grid grid-cols-2 gap-2">
              <div>
                Category:{" "}
                <Link
                  to={`/category/${product.category?._id}`}
                  className="text-indigo-300 underline ml-1"
                >
                  {product.category?.name}
                </Link>
              </div>
              <div>
                Subcategory:{" "}
                <span className="text-white ml-1">
                  {product.subCategory?.name}
                </span>
              </div>
              <div>
                Rating:{" "}
                <span className="text-white ml-1">{product.rating}</span>
              </div>
              <div>
                SKU:{" "}
                <span className="text-white ml-1">{product._id.slice(-8)}</span>
              </div>
            </div>
          </div>

          {/* Additional details block — full width */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h4 className="text-white/80 font-semibold">Product Details</h4>
            <p className="text-white/60 mt-3 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/60">
              <div>Material: Cotton (Premium)</div>
              <div>Care: Machine wash cold, gentle cycle</div>
              <div>Fit: Relaxed / Oversized</div>
              <div>Origin: Made in India</div>
            </div>
          </div>
        </div>
      </motion.div>
      {id && <Review ProductId={id} />}
    </div>
  );
}
