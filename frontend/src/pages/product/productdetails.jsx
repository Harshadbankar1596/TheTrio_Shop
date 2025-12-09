import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useAddCartItemMutation,
} from "../../redux/Admin/userAPI";
import Loader from "../../components/Loader";
import { ShoppingBag, Star, Zap } from "lucide-react";
import Review from "./Review.jsx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {ProductPageShimmer} from "./ShimmerProducts.jsx"
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductByIdQuery(id);
  const [addCartItem] = useAddCartItemMutation();
  const userId = useSelector((s) => s.user.id);

  const product = data?.data || null;
  console.log(product);

  const [mainIndex, setMainIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setMainIndex(0);
      setSelectedSize(product.sizes?.[0] || "");
      setQty(product.stock > 0 ? 1 : 0);
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (isLoading) return <ProductPageShimmer />;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
        <p className="text-xl">Product not found.</p>
      </div>
    );
  }

  const format = (n) =>
    Number(n).toLocaleString("en-IN", { style: "currency", currency: "INR" });

  const ratingRounded = Math.round(product.rating || 0);

  return (
    <div className="min-h-screen bg-[#131415] text-white px-4 sm:px-6 lg:px-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12"
      >
        {/* LEFT IMAGES — EXACT SAME LIKE IMAGE (THUMBNAIL COLUMN + MAIN IMG) */}
        <div className="lg:col-span-5 flex gap-6">
          {/* THUMBNAILS COLUMN */}
          <div className="flex flex-col gap-4">
            {product.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainIndex(i)}
                className={`
                w-20 h-28 rounded-xl overflow-hidden border
                transition-all duration-300
                ${
                  i === mainIndex
                    ? "border-[#4ad97b]"
                    : "border-[#2a2a2a] hover:border-[#3a3a3a]"
                }
              `}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="flex-1">
            <div className="bg-[#1d1d1f] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={product.images?.[mainIndex]}
                alt={product.title}
                className="w-full h-[550px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SECTION — MATCHING EXACT LAYOUT */}
        <div className="lg:col-span-7 space-y-8">
          {/* BREADCRUMB */}
          <p className="text-sm text-gray-400">
            Fashion Wear /{" "}
            <span className="text-gray-300">{product.title}</span>
          </p>

          {/* HOTTEST TREND */}
          <p className="text-green-400 uppercase tracking-[2px] text-xs font-semibold">
            Hottest Trend
          </p>

          {/* TITLE */}
          <h1 className="text-4xl font-bold">{product.title}</h1>

          {/* DESIGNER LIKE TEXT */}
          <p className="text-gray-400 text-lg">
            {product.subCategory?.name || ""} · {product.colors}
          </p>

          {/* PRICE BLOCK */}
          <div className="mt-4">
            <p className="text-3xl font-bold">
              {format(product.finalPrice)}
              <span className="text-gray-400 text-sm ml-2">Incl. Taxes</span>
            </p>
            {product.discount > 0 && (
              <p className="text-gray-500 line-through mt-1">
                {format(product.price)}
              </p>
            )}
          </div>

          {/* DESCRIPTION — EXACT LIKE IMAGE (NARROW WIDTH PARA) */}
          <p className="text-gray-300 max-w-lg leading-relaxed">
            {product.description}
          </p>

          {/* SIZE SELECTOR — SAME ROUND BUTTON STYLE */}
          <div>
            <p className="mb-2 text-gray-300">Select Size</p>

            <div className="flex gap-3">
              {product.sizes?.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`
                  w-12 h-12 rounded-full border flex items-center justify-center
                  transition-all
                  ${
                    selectedSize === s
                      ? "bg-[#4ad97b] text-black border-[#4ad97b]"
                      : "border-[#3a3a3a] text-white hover:border-[#5a5a5a]"
                  }
                `}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY SELECTOR */}
          <div className="mt-4">
            <p className="mb-2 text-gray-300">Quantity</p>

            <div className="flex items-center gap-4">
              {/* Minus Button */}
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="
        w-10 h-10 flex items-center justify-center 
        rounded-lg border border-gray-600 
        text-xl hover:bg-[#222] transition
      "
              >
                -
              </button>

              {/* Qty Display */}
              <span className="text-xl font-semibold">{qty}</span>

              {/* Plus Button */}
              <button
                onClick={() => qty < product.stock && setQty(qty + 1)}
                className="
        w-10 h-10 flex items-center justify-center 
        rounded-lg border border-gray-600 
        text-xl hover:bg-[#222] transition
      "
              >
                +
              </button>
            </div>

            {/* Stock Warning */}
            <p className="text-gray-400 text-sm mt-1">
              {product.stock} items available
            </p>
          </div>

          {/* ACTION BUTTONS — EXACT SAME LAYOUT */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={async () => {
                if (!userId) return toast.error("Please login first");
                try {
                  await addCartItem({
                    userId,
                    productId: product._id,
                    quantity: qty,
                    size: selectedSize,
                  }).unwrap();
                  toast.success("Added to cart!");
                } catch {
                  toast.error("Something went wrong");
                }
              }}
              className="
              flex-1 bg-[#1d1d1f] border border-[#2d2d2d] 
              text-white py-3 rounded-xl font-semibold 
              hover:bg-[#2a2a2c] transition
            "
            >
              Add to Cart
            </button>

            {!product.isActive ? (
              <div
                className="
      flex items-center justify-center
      w-1/6 py-3
      rounded-xl
      bg-red-900/30
      border border-red-500/30
      text-red-400
      font-semibold
      tracking-wide
      cursor-not-allowed
      select-none
      shadow-[0_0_20px_rgba(255,0,0,0.15)]
    "
              >
                Out of Stock
              </div>
            ) : (
              <button
                onClick={() => {
                  const subtotal = qty * product.finalPrice;
                  navigate("/order", {
                    state: {
                      items: [{ product, quantity: qty, size: selectedSize }],
                      subtotal,
                      delivery: 40,
                      total: subtotal + 40,
                      totalDiscount: product.price - product.finalPrice,
                    },
                  });
                }}
                className="
      flex-1 py-3
      rounded-xl 
      font-semibold
     bg-green-500
      text-black
      shadow-lg shadow-green-500/30
      transition-all duration-300
      hover:shadow-emerald-500/50
      hover:brightness-110
      active:scale-[0.98]
    "
              >
                Proceed to Purchase
              </button>
            )}
          </div>

          {/* PRODUCT DETAILS BLOCKS (DOTS STYLE) */}
          <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-5">
            <span className="text-gray-300">
              Product Details : {product.description}
            </span>
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            </div>
          </div>

          {/* REVIEWS ROW */}
          <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-5">
            <span className="text-gray-300">
              Reviews {product.reviewCount || 0}
            </span>

            <div className="flex items-center gap-2 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < ratingRounded ? "fill-yellow-400" : "text-gray-600"
                  }
                />
              ))}
              <span className="text-gray-300">{product.rating}</span>
            </div>
          </div>

          {/* DELIVERY INFO */}
          {/* <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-5">
            <span className="text-gray-300">Delivery info</span>
            <span className="text-green-400 font-semibold">Free Shipping</span>
          </div> */}
        </div>
      </motion.div>

      {/* REVIEWS BELOW */}
      {id && <Review ProductId={id} />}
    </div>
  );
}
