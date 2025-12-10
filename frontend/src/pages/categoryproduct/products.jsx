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

    if (filters.brand) {
      list = list.filter((p) => p.category?.name === filters.brand);
    }

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
        hover:border-[#2a2a2a]
        p-5
        transition-all duration-300
        h-full flex flex-col
      "
              >
                {item.discount > 0 && (
                  <span
                    className="
            absolute top-4 left-4
            bg-green-500
            text-black 
            text-[11px] 
            font-bold 
            px-3 py-[5px] 
          "
                  >
                    Sale {item.discount}%
                  </span>
                )}

                {/* PRODUCT IMAGE */}
                <div
                  className="
          w-full 
          h-96 
          overflow-hidden 
          bg-[#1a1a1a]
          flex justify-center items-center
        "
                >
                  <motion.img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    // whileHover={{ scale: 1.03 }}
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