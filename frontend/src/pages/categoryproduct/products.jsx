// import React, { useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import Loader from "../../components/Loader";
// import { Star } from "lucide-react";

// export default function Products({ products = [], loading, appliedFilters }) {

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   // FILTER SYSTEM
//   const filteredProducts = useMemo(() => {
//     let list = [...products];
//     const filters = appliedFilters;

//     if (!filters) return list;

//     if (filters.subCategoryId) {
//       list = list.filter((p) => p.subCategory?._id === filters.subCategoryId);
//     }

//     list = list.filter((p) => {
//       const price = Number(p.finalPrice ?? p.price);
//       return price >= filters.priceRange.min && price <= filters.priceRange.max;
//     });

//     if (filters.discountOnly) {
//       list = list.filter((p) => p.discount >= filters.minDiscount);
//     }

//     list = list.filter((p) => (p.rating ?? 0) >= filters.minRating);

//     if (filters.sortBy === "price-asc") list.sort((a, b) => a.finalPrice - b.finalPrice);
//     if (filters.sortBy === "price-desc") list.sort((a, b) => b.finalPrice - a.finalPrice);
//     if (filters.sortBy === "rating-desc") list.sort((a, b) => b.rating - a.rating);
//     if (filters.sortBy === "discount-desc") list.sort((a, b) => b.discount - a.discount);

//     return list;
//   }, [products, appliedFilters]);

//   // ANIMATION
//   const cardVariant = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//     hover: {
//       scale: 1.04,
//       rotateX: 3,
//       rotateY: -3,
//       boxShadow: "0px 30px 70px rgba(99,102,241,0.25)",
//       transition: { duration: 0.35, ease: "easeOut" },
//     },
//   };

//   return (
//     <div className="px-4 sm:px-6 md:px-16 py-10 bg-black text-white min-h-screen">

//       {/* LOADER */}
//       {loading && (
//         <div className="mt-20 flex justify-center">
//           <Loader />
//         </div>
//       )}

//       {!loading && filteredProducts.length === 0 && (
//         <p className="text-center text-white/60 mt-10">
//           No products found.
//         </p>
//       )}

//       {/* RESPONSIVE GRID */}
//       <div
//         className="
//           grid
//           grid-cols-1
//           sm:grid-cols-2
//           md:grid-cols-3
//           lg:grid-cols-3
//           gap-8 md:gap-10 lg:gap-12
//           mt-6
//         "
//       >
//         {filteredProducts.map((item, index) => (
//           <Link key={item._id} to={`/product/${item._id}`}>
//             <motion.div
//               variants={cardVariant}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               transition={{ delay: index * 0.05 }}
//               className="
//                 bg-white/5 border border-white/10 backdrop-blur-2xl
//                 rounded-2xl overflow-hidden p-4 lg:p-6
//                 shadow-[0_25px_70px_rgba(0,0,0,0.45)]
//                 cursor-pointer group
//                 transition-all duration-500
//               "
//             >
//               {/* IMAGE — BIGGER ON DESKTOP */}
//               <div className="
//                 relative w-full
//                 h-64 sm:h-72 md:h-72 lg:h-80
//                 rounded-xl overflow-hidden bg-black/40
//               ">
//                 <motion.img
//                   src={item.images[0]}
//                   alt={item.title}
//                   className="w-full h-full object-cover"
//                   whileHover={{ scale: 1.12 }}
//                   transition={{ duration: 0.8, ease: "easeOut" }}
//                 />
//               </div>

//               {/* TITLE */}
//               <h3 className="mt-4 text-lg lg:text-xl font-semibold tracking-tight">
//                 {item.title.length > 40
//                   ? item.title.slice(0, 40) + "…"
//                   : item.title}
//               </h3>

//               {/* PRICE */}
//               <div className="flex items-center gap-3 mt-2">
//                 <p className="text-indigo-400 font-semibold text-xl">
//                   ₹{item.finalPrice}
//                 </p>
//                 {item.discount > 0 && (
//                   <p className="text-white/40 line-through text-sm">
//                     ₹{item.price}
//                   </p>
//                 )}
//               </div>

//               {/* RATING */}
//               <div className="flex items-center gap-1 mt-1 opacity-80">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star
//                     key={i}
//                     size={16}
//                     className={
//                       i < Math.round(item.rating)
//                         ? "text-indigo-400 fill-indigo-400"
//                         : "text-white/20"
//                     }
//                   />
//                 ))}
//                 <span className="text-xs ml-1 text-white/40">{item.rating}</span>
//               </div>
//             </motion.div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import Loader from "../../components/Loader";
// import { Star, ShoppingBag, Eye, Zap } from "lucide-react";

// export default function Products({ products = [], loading, appliedFilters }) {
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   // FILTER SYSTEM (same as before)
//   const filteredProducts = useMemo(() => {
//     let list = [...products];
//     const filters = appliedFilters;

//     if (!filters) return list;

//     if (filters.subCategoryId) {
//       list = list.filter((p) => p.subCategory?._id === filters.subCategoryId);
//     }

//     list = list.filter((p) => {
//       const price = Number(p.finalPrice ?? p.price);
//       return price >= filters.priceRange.min && price <= filters.priceRange.max;
//     });

//     if (filters.discountOnly) {
//       list = list.filter((p) => p.discount >= filters.minDiscount);
//     }

//     list = list.filter((p) => (p.rating ?? 0) >= filters.minRating);

//     if (filters.sortBy === "price-asc")
//       list.sort((a, b) => a.finalPrice - b.finalPrice);
//     if (filters.sortBy === "price-desc")
//       list.sort((a, b) => b.finalPrice - a.finalPrice);
//     if (filters.sortBy === "rating-desc")
//       list.sort((a, b) => b.rating - a.rating);
//     if (filters.sortBy === "discount-desc")
//       list.sort((a, b) => b.discount - a.discount);

//     return list;
//   }, [products, appliedFilters]);

//   // ANIMATION
//   const cardVariant = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
//     },
//     hover: {
//       y: -8,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//   };

//   const imageVariant = {
//     hover: {
//       scale: 1.1,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };

//   const buttonVariant = {
//     hidden: { y: 10, opacity: 0 },
//     hover: { y: 0, opacity: 1 },
//   };

//   return (
//     <div className="px-4 sm:px-6 md:px-1 py-1 bg-gradient-to-b from-gray-900 to-black min-h-screen">
//       {/* LOADER */}
//       {loading && (
//         <div className="mt-20 flex justify-center">
//           <Loader />
//         </div>
//       )}

//       {!loading && filteredProducts.length === 0 && (
//         <div className="text-center py-20">
//           <p className="text-gray-400 text-lg">
//             No products found. Try adjusting your filters.
//           </p>
//         </div>
//       )}

//       {/* RESPONSIVE GRID */}
//       {/* RESPONSIVE GRID */}
//       <div
//         className="
//     grid
//     gap-10
//     grid-cols-1
//     sm:grid-cols-2
//     md:grid-cols-2
//     lg:grid-cols-[repeat(auto-fill,minmax(380px,1fr))]
//   "
//       >
//         {filteredProducts.map((item, index) => (
//           <motion.div
//             key={item._id}
//             variants={cardVariant}
//             initial="hidden"
//             animate="visible"
//             whileHover="hover"
//             transition={{ delay: index * 0.05 }}
//             className="
//         group relative
//         w-full
//         max-w-[430px]     /* Card Width Increased */
//         mx-auto           /* Center Card */
//       "
//           >
//             <Link to={`/product/${item._id}`}>
//               {/* CARD CONTAINER */}
//               <div
//                 className="
//           h-full
//           bg-gradient-to-br from-gray-800/40 to-gray-900/60
//           border border-gray-700/40
//           rounded-3xl
//           overflow-hidden
//           p-6 md:p-7
//           backdrop-blur-md
//           shadow-2xl
//           hover:shadow-indigo-900/40
//           transition-all duration-500
//           hover:border-gray-500
//           flex flex-col
//           min-h-[600px]
//         "
//               >
//                 {/* DISCOUNT BADGE */}
//                 {item.discount > 0 && (
//                   <div className="absolute top-5 left-5 z-10">
//                     <div
//                       className="
//                 bg-gradient-to-r from-red-500 to-pink-500
//                 text-white text-xs font-bold
//                 px-4 py-2
//                 rounded-full
//                 shadow-xl
//                 flex items-center gap-1
//               "
//                     >
//                       <Zap size={14} />
//                       {item.discount}% OFF
//                     </div>
//                   </div>
//                 )}

//                 {/* IMAGE */}
//                 <div
//                   className="
//             relative
//             w-full
//             h-80 sm:h-88 md:h-96
//             rounded-2xl
//             overflow-hidden
//             bg-gradient-to-br from-gray-800 to-gray-900
//             mb-7
//           "
//                 >
//                   <motion.div
//                     className="w-full h-full"
//                     variants={imageVariant}
//                     whileHover="hover"
//                   >
//                     <img
//                       src={item.images[0]}
//                       alt={item.title}
//                       className="w-full h-full object-cover object-center transition-all"
//                     />
//                   </motion.div>

//                   {/* QUICK VIEW */}
//                   <div
//                     className="
//               absolute inset-0
//               bg-black/70
//               opacity-0 group-hover:opacity-100
//               transition-opacity duration-500
//               flex items-end justify-center
//               pb-6
//             "
//                   >
//                     <motion.button
//                       variants={buttonVariant}
//                       initial="hidden"
//                       whileHover="hover"
//                       onClick={(e) => e.preventDefault()}
//                       className="
//                   bg-white text-gray-900
//                   px-5 py-2.5
//                   rounded-xl
//                   font-medium
//                   flex items-center gap-2
//                   shadow-xl
//                   hover:bg-gray-200
//                 "
//                     >
//                       <Eye size={18} />
//                       Quick View
//                     </motion.button>
//                   </div>
//                 </div>

//                 {/* CATEGORY */}
//                 <span className="text-indigo-400/80 text-sm font-medium mb-2">
//                   {item.category?.name}
//                 </span>

//                 {/* TITLE */}
//                 <h3
//                   className="
//             text-white
//             font-semibold
//             text-xl md:text-2xl
//             leading-tight
//             mb-4
//             line-clamp-2
//             group-hover:text-indigo-300
//             transition-colors
//           "
//                 >
//                   {item.title}
//                 </h3>

//                 {/* RATING */}
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                       <Star
//                         key={i}
//                         size={16}
//                         className={
//                           i < Math.round(item.rating)
//                             ? "text-yellow-400 fill-yellow-400"
//                             : "text-gray-600"
//                         }
//                       />
//                     ))}
//                   </div>

//                   <span className="text-gray-400 text-sm">
//                     {item.rating} • ({item.reviewCount || "No"} reviews)
//                   </span>
//                 </div>

//                 {/* PRICE SECTION */}
//                 <div className="mt-auto pt-5 border-t border-gray-700/50">
//                   <div className="flex items-center justify-between">
//                     {/* PRICE */}
//                     <div className="flex items-baseline gap-2">
//                       <span className="text-3xl font-bold text-white">
//                         ₹{item.finalPrice.toLocaleString()}
//                       </span>

//                       {item.discount > 0 && (
//                         <>
//                           <span className="text-gray-400 line-through text-sm">
//                             ₹{item.price.toLocaleString()}
//                           </span>
//                           <span className="text-green-400 text-sm font-medium">
//                             Save ₹
//                             {(item.price - item.finalPrice).toLocaleString()}
//                           </span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* STOCK STATUS */}
//                 {item.stock <= 10 && item.stock > 0 && (
//                   <div
//                     className="
//               absolute top-5 right-5
//               bg-amber-900/30 text-amber-400
//               text-xs font-medium
//               px-4 py-2
//               rounded-full
//               backdrop-blur-sm
//             "
//                   >
//                     Only {item.stock} left
//                   </div>
//                 )}
//                 {item.stock === 0 && (
//                   <div
//                     className="
//               absolute top-5 right-5
//               bg-red-900/30 text-red-400
//               text-xs font-medium
//               px-4 py-2
//               rounded-full
//               backdrop-blur-sm
//             "
//                   >
//                     Out of Stock
//                   </div>
//                 )}
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {/* PRODUCTS COUNT */}
//       {!loading && filteredProducts.length > 0 && (
//         <div
//           className="
//           mt-12 pt-8
//           border-t border-gray-800
//           text-center
//         "
//         >
//           <p className="text-gray-400">
//             Showing{" "}
//             <span className="text-white font-medium">
//               {filteredProducts.length}
//             </span>{" "}
//             products
//             {appliedFilters && " with selected filters"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { Star, ShoppingBag, Eye, Zap, Heart } from "lucide-react";

export default function Products({ products = [], loading, appliedFilters }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // FILTER SYSTEM (same as before)
  const filteredProducts = useMemo(() => {
    let list = [...products];
    const filters = appliedFilters;

    if (!filters) return list;

    if (filters.subCategoryId) {
      list = list.filter((p) => p.subCategory?._id === filters.subCategoryId);
    }

    list = list.filter((p) => {
      const price = Number(p.finalPrice ?? p.price);
      return price >= filters.priceRange.min && price <= filters.priceRange.max;
    });

    if (filters.discountOnly) {
      list = list.filter((p) => p.discount >= filters.minDiscount);
    }

    list = list.filter((p) => (p.rating ?? 0) >= filters.minRating);

    if (filters.sortBy === "price-asc")
      list.sort((a, b) => a.finalPrice - b.finalPrice);
    if (filters.sortBy === "price-desc")
      list.sort((a, b) => b.finalPrice - a.finalPrice);
    if (filters.sortBy === "rating-desc")
      list.sort((a, b) => b.rating - a.rating);
    if (filters.sortBy === "discount-desc")
      list.sort((a, b) => b.discount - a.discount);

    return list;
  }, [products, appliedFilters]);

  // ANIMATION
  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const imageVariant = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariant = {
    hidden: { y: 10, opacity: 0 },
    hover: { y: 0, opacity: 1 },
  };

  return (
    <div className="px-4 sm:px-6 md:px-1 py-1 ">
      {/* LOADER */}
      {loading && (
        <div className="mt-20 flex justify-center">
          <Loader />
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">
            No products found. Try adjusting your filters.
          </p>
        </div>
      )}

      {/* RESPONSIVE GRID */}
      {/* RESPONSIVE GRID */}
      <div
        className="
    grid 
    gap-10
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-2
    lg:grid-cols-[repeat(auto-fill,minmax(380px,1fr))]
  "
      >
        {filteredProducts.map((item, index) => (
          <motion.div
            key={item._id}
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: index * 0.05 }}
            className="group w-full max-w-[420px] mx-auto"
          >
            <Link to={`/product/${item._id}`}>
              <div
                className="
        relative
        bg-[#121212]
        border border-[#1E1E1E]
        hover:border-[#2a2a2a]
        rounded-2xl
        p-5
        transition-all duration-300
        h-full flex flex-col
      "
              >
                {/* SALE BADGE (TOP LEFT) */}
                {item.discount > 0 && (
                  <span
                    className="
            absolute top-4 left-4
            bg-[#E7F158]
            text-black 
            text-[11px] 
            font-bold 
            px-3 py-[5px] 
            rounded-full 
          "
                  >
                    Sale {item.discount}%
                  </span>
                )}

                {/* PRODUCT IMAGE */}
                <div
                  className="
          w-full 
          h-64 
          rounded-xl 
          overflow-hidden 
          bg-[#1a1a1a]
          flex justify-center items-center
        "
                >
                  <motion.img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* BRAND NAME */}
                <p className="text-[13px] text-gray-400 mt-4 uppercase font-medium tracking-wide">
                  {item.category?.name || "Brand"}
                </p>

                {/* PRODUCT TITLE */}
                <h3 className="text-[17px] text-white font-semibold mt-1 line-clamp-1">
                  {item.title}
                </h3>

                {/* PRICE ROW */}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[20px] font-bold text-white">
                    ₹{item.finalPrice}
                  </span>

                  {item.discount > 0 && (
                    <span className="text-[13px] text-gray-500 line-through">
                      ₹{item.price}
                    </span>
                  )}
                </div>

                {/* RATING */}
                <div className="flex items-center gap-2 mt-2">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-gray-300 text-[13px]">
                    {item.rating}
                  </span>
                </div>

                {/* OPTIONAL SUBTEXT (small description) */}
                <p className="text-gray-500 text-[13px] mt-1 line-clamp-1">
                  {item.subCategory?.name || ""}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* PRODUCTS COUNT */}
      {!loading && filteredProducts.length > 0 && (
        <div
          className="
          mt-12 pt-8
          border-t border-gray-800
          text-center
        "
        >
          <p className="text-gray-400">
            Showing{" "}
            <span className="text-white font-medium">
              {filteredProducts.length}
            </span>{" "}
            products
            {appliedFilters && " with selected filters"}
          </p>
        </div>
      )}
    </div>
  );
}
