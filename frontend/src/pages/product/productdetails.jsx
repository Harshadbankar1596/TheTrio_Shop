// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import {
//   useGetProductByIdQuery,
//   useAddCartItemMutation,
// } from "../../redux/Admin/userAPI";
// import Loader from "../../components/Loader";
// import { ShoppingBag, Star, Zap } from "lucide-react";
// import Review from "./Review.jsx";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data, isLoading } = useGetProductByIdQuery(id);
//   const [addCartItem] = useAddCartItemMutation();
//   const userId = useSelector((s) => s.user.id);

//   const product = data?.data || null;

//   const [mainIndex, setMainIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [qty, setQty] = useState(1);

//   useEffect(() => {
//     if (product) {
//       setMainIndex(0);
//       setSelectedSize(product.sizes?.[0] || "");
//       setQty(product.stock > 0 ? 1 : 0);
//     }
//   }, [product]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [id]);

//   if (isLoading) return <Loader />;

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
//         <p className="text-xl">Product not found.</p>
//       </div>
//     );
//   }

//   const format = (n) =>
//     Number(n).toLocaleString("en-IN", { style: "currency", currency: "INR" });

//   const ratingRounded = Math.round(product.rating || 0);

//   return (
//     <div
//       className="
//       min-h-screen
//       bg-gradient-to-b from-gray-950 via-black to-gray-950
//       text-white
//       px-4 sm:px-6 lg:px-14 xl:px-20
//       py-12
//     "
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
//       >
//         {/* LEFT SECTION — IMAGES */}
//         <div className="lg:col-span-6">
//           <div
//             className="
//             bg-white/5
//             border border-white/10
//             rounded-3xl
//             p-5
//             backdrop-blur-xl
//             shadow-[0_25px_80px_rgba(0,0,0,0.45)]
//             hover:shadow-[0_35px_100px_rgba(0,0,0,0.55)]
//             transition-all
//           "
//           >
//             {/* MAIN IMAGE */}
//             <div className="relative w-full rounded-2xl overflow-hidden">
//               <motion.img
//                 src={product.images?.[mainIndex]}
//                 alt={product.title}
//                 className="
//                   w-full
//                   h-[520px] md:h-[560px]
//                   object-cover
//                   rounded-2xl
//                   transition-all duration-700
//                   hover:scale-105
//                   shadow-xl
//                 "
//                 whileHover={{ scale: 1.03 }}
//               />

//               {/* PRICE BADGE */}
//               <div className="absolute top-4 left-4 bg-black/60 border border-white/10 px-4 py-2 rounded-full">
//                 <p className="text-xs text-white/60">Price</p>
//                 <p className="text-sm font-semibold text-indigo-300">
//                   {format(product.finalPrice)}
//                 </p>
//               </div>

//               {/* CATEGORY BADGE */}
//               <Link
//                 to={`/category/${product.category?._id}`}
//                 className="
//                 absolute top-4 right-4
//                 bg-white/10 border border-white/20
//                 px-4 py-2 rounded-full
//                 text-sm text-white/80
//                 hover:bg-white/20 transition
//               "
//               >
//                 {product.category?.name}
//               </Link>
//             </div>

//             {/* THUMBNAILS */}
//             <div className="flex gap-4 mt-5">
//               {product.images?.map((img, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setMainIndex(i)}
//                   className={`
//                     w-20 h-20
//                     rounded-2xl
//                     overflow-hidden
//                     border
//                     transition-all duration-300
//                     shadow-md
//                     ${
//                       i === mainIndex
//                         ? "border-indigo-400 scale-105 shadow-indigo-500/40"
//                         : "border-white/10 hover:scale-105 hover:border-white/30"
//                     }
//                   `}
//                 >
//                   <img
//                     src={img}
//                     alt="thumb"
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="lg:col-span-6 flex flex-col gap-6">
//           {/* PRODUCT INFO CARD */}
//           <div
//             className="
//             bg-white/5
//             border border-white/10
//             rounded-3xl
//             p-7
//             backdrop-blur-xl
//             shadow-[0_25px_80px_rgba(0,0,0,0.45)]
//             transition-all
//           "
//           >
//             {/* TITLE AREA */}
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
//                   {product.title}
//                 </h1>
//                 <p className="text-sm text-white/60 mt-1">
//                   {product.subCategory?.name} · {product.colors}
//                 </p>
//               </div>

//               {/* RATING */}
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center">
//                   {Array.from({ length: 5 }).map((_, idx) => (
//                     <Star
//                       key={idx}
//                       size={18}
//                       className={
//                         idx < ratingRounded
//                           ? "text-indigo-400"
//                           : "text-white/20"
//                       }
//                     />
//                   ))}
//                 </div>
//                 <span className="text-sm text-white/60">
//                   {product.rating?.toFixed(1)}
//                 </span>
//               </div>
//             </div>

//             {/* DESCRIPTION */}
//             <p className="mt-4 text-white/70 leading-relaxed">
//               {product.description}
//             </p>

//             {/* PRICE ROW */}
//             <div className="mt-6 flex items-center gap-6">
//               <div>
//                 <p className="text-indigo-300 font-bold text-3xl md:text-4xl">
//                   {format(product.finalPrice)}
//                 </p>
//                 {product.discount > 0 && (
//                   <p className="text-white/40 line-through text-sm">
//                     ₹{product.price}
//                   </p>
//                 )}
//               </div>

//               <div className="ml-auto text-sm text-white/60">
//                 <p>
//                   Stock: <span className="text-white">{product.stock}</span>
//                 </p>
//                 <p className="mt-1">
//                   Discount:{" "}
//                   <span className="text-indigo-300">{product.discount}%</span>
//                 </p>
//               </div>
//             </div>

//             {/* SIZE + COLOR GRID */}
//             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Sizes */}
//               <div>
//                 <p className="text-sm text-white/60 mb-2">Select Size</p>
//                 <div className="flex gap-3 flex-wrap">
//                   {product.sizes?.map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => setSelectedSize(s)}
//                       className={`
//                         px-5 py-2.5
//                         rounded-xl
//                         border
//                         text-sm
//                         font-medium
//                         transition-all
//                         ${
//                           selectedSize === s
//                             ? "border-indigo-400 bg-indigo-500/20 text-white shadow-md shadow-indigo-500/30"
//                             : "border-white/10 hover:border-white/30 hover:bg-white/5 text-white/80"
//                         }
//                       `}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Colors */}
//               <div>
//                 <p className="text-sm text-white/60 mb-2">Color</p>
//                 <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
//                   {product.colors || "—"}
//                 </div>
//               </div>
//             </div>

//             {/* QUANTITY + ACTIONS */}
//             <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch">
//               {/* Quantity Selector */}
//               <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
//                 <button
//                   onClick={() => setQty((q) => Math.max(1, q - 1))}
//                   className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition"
//                 >
//                   -
//                 </button>
//                 <div className="px-4 py-1 text-white font-semibold">{qty}</div>
//                 <button
//                   onClick={() =>
//                     setQty((q) => Math.min(product.stock, q + 1))
//                   }
//                   className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition"
//                 >
//                   +
//                 </button>
//               </div>

//               {/* Add to Cart */}
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 onClick={async () => {
//                   if (!userId) return toast.error("Please login first!");

//                   try {
//                     await addCartItem({
//                       userId,
//                       productId: product._id,
//                       quantity: qty,
//                       size: selectedSize,
//                     }).unwrap();
//                     toast.success("Added to cart!");
//                   } catch {
//                     toast.error("Something went wrong!");
//                   }
//                 }}
//                 className="
//                 flex-1
//                 inline-flex items-center justify-center
//                 gap-3
//                 rounded-full
//                 bg-indigo-500
//                 text-black
//                 font-semibold
//                 py-3
//                 shadow-lg shadow-indigo-500/30
//               "
//               >
//                 <ShoppingBag size={18} />
//                 Add to Cart
//               </motion.button>

//               {/* Buy Now */}
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 onClick={() => {
//                   const price = product.finalPrice;
//                   const subtotal = price * qty;
//                   navigate("/order", {
//                     state: {
//                       items: [{ product, quantity: qty }],
//                       subtotal,
//                       delivery: 40,
//                       total: subtotal + 40,
//                     },
//                   });
//                 }}
//                 className="
//                 inline-flex items-center justify-center
//                 rounded-full
//                 bg-white/10
//                 border border-white/20
//                 text-white
//                 font-semibold
//                 py-3 px-6
//               "
//               >
//                 Buy Now
//               </motion.button>
//             </div>

//             {/* META DATA */}
//             <div className="mt-8 text-sm text-white/60 grid grid-cols-2 gap-2">
//               <div>
//                 Category:
//                 <Link
//                   to={`/category/${product.category?._id}`}
//                   className="text-indigo-300 ml-1"
//                 >
//                   {product.category?.name}
//                 </Link>
//               </div>
//               <div>Subcategory: {product.subCategory?.name}</div>
//               <div>Rating: {product.rating}</div>
//               <div>SKU: {product._id.slice(-8)}</div>
//             </div>
//           </div>

//           {/* EXTRA DETAILS */}
//           <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
//             <h4 className="text-lg font-semibold text-white/90">
//               Product Details
//             </h4>
//             <p className="text-white/70 mt-3">{product.description}</p>

//             <div className="grid grid-cols-2 gap-3 mt-4 text-white/60 text-sm">
//               <p>Material: Premium Cotton</p>
//               <p>Wash: Machine Wash Cold</p>
//               <p>Fit: Oversized / Relaxed</p>
//               <p>Origin: Made in India</p>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* REVIEWS */}
//       {id && <Review ProductId={id} />}
//     </div>
//   );
// }

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

  if (isLoading) return <Loader />;

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
                      items: [{ product, quantity: qty , size : selectedSize}],
                      subtotal,
                      delivery: 40,
                      total: subtotal + 40,
                      totalDiscount : product.price - product.finalPrice 
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
            <span className="text-gray-300">Product Details : {product.description}</span>
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
