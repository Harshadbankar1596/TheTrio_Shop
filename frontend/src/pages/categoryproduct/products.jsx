

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
//       scale: 1.03,
//       rotateX: 3,
//       rotateY: -3,
//       boxShadow: "0px 25px 60px rgba(99,102,241,0.25)",
//       transition: { duration: 0.4, ease: "easeOut" },
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
//           lg:grid-cols-4 
//           gap-6 sm:gap-8 md:gap-10 
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
//                 rounded-2xl overflow-hidden p-4 
//                 shadow-[0_20px_60px_rgba(0,0,0,0.35)]
//                 cursor-pointer group
//                 transition-all duration-500
//                 w-full
//               "
//             >
//               {/* IMAGE */}
//               <div className="relative w-full h-60 sm:h-72 md:h-64 lg:h-72 rounded-xl overflow-hidden bg-black/40">
//                 <motion.img
//                   src={item.images[0]}
//                   alt={item.title}
//                   className="w-full h-full object-cover"
//                   whileHover={{ scale: 1.1 }}
//                   transition={{ duration: 0.8, ease: "easeOut" }}
//                 />
//               </div>

//               {/* TITLE */}
//               <h3 className="mt-4 text-base sm:text-lg font-semibold tracking-tight">
//                 {item.title.length > 40
//                   ? item.title.slice(0, 40) + "…"
//                   : item.title}
//               </h3>

//               {/* PRICE */}
//               <div className="flex items-center gap-3 mt-2">
//                 <p className="text-indigo-400 font-semibold text-lg">
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
//                     size={14}
//                     className={
//                       i < Math.round(item.rating)
//                         ? "text-indigo-400 fill-indigo-400"
//                         : "text-white/20"
//                     }
//                   />
//                 ))}
//                 <span className="text-xs ml-1 text-white/40">
//                   {item.rating}
//                 </span>
//               </div>
//             </motion.div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { Star } from "lucide-react";

export default function Products({ products = [], loading, appliedFilters }) {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // FILTER SYSTEM
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

    if (filters.sortBy === "price-asc") list.sort((a, b) => a.finalPrice - b.finalPrice);
    if (filters.sortBy === "price-desc") list.sort((a, b) => b.finalPrice - a.finalPrice);
    if (filters.sortBy === "rating-desc") list.sort((a, b) => b.rating - a.rating);
    if (filters.sortBy === "discount-desc") list.sort((a, b) => b.discount - a.discount);

    return list;
  }, [products, appliedFilters]);


  // ANIMATION
  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.04,
      rotateX: 3,
      rotateY: -3,
      boxShadow: "0px 30px 70px rgba(99,102,241,0.25)",
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <div className="px-4 sm:px-6 md:px-16 py-10 bg-black text-white min-h-screen">

      {/* LOADER */}
      {loading && (
        <div className="mt-20 flex justify-center">
          <Loader />
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <p className="text-center text-white/60 mt-10">
          No products found.
        </p>
      )}

      {/* RESPONSIVE GRID */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-3 
          gap-8 md:gap-10 lg:gap-12
          mt-6
        "
      >
        {filteredProducts.map((item, index) => (
          <Link key={item._id} to={`/product/${item._id}`}>
            <motion.div
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: index * 0.05 }}
              className="
                bg-white/5 border border-white/10 backdrop-blur-2xl
                rounded-2xl overflow-hidden p-4 lg:p-6
                shadow-[0_25px_70px_rgba(0,0,0,0.45)]
                cursor-pointer group
                transition-all duration-500
              "
            >
              {/* IMAGE — BIGGER ON DESKTOP */}
              <div className="
                relative w-full 
                h-64 sm:h-72 md:h-72 lg:h-80 
                rounded-xl overflow-hidden bg-black/40
              ">
                <motion.img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              {/* TITLE */}
              <h3 className="mt-4 text-lg lg:text-xl font-semibold tracking-tight">
                {item.title.length > 40
                  ? item.title.slice(0, 40) + "…"
                  : item.title}
              </h3>

              {/* PRICE */}
              <div className="flex items-center gap-3 mt-2">
                <p className="text-indigo-400 font-semibold text-xl">
                  ₹{item.finalPrice}
                </p>
                {item.discount > 0 && (
                  <p className="text-white/40 line-through text-sm">
                    ₹{item.price}
                  </p>
                )}
              </div>

              {/* RATING */}
              <div className="flex items-center gap-1 mt-1 opacity-80">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.round(item.rating)
                        ? "text-indigo-400 fill-indigo-400"
                        : "text-white/20"
                    }
                  />
                ))}
                <span className="text-xs ml-1 text-white/40">{item.rating}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}