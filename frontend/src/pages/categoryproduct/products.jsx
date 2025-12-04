import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";
import Loader from "../../components/Loader";
import { useAddCartItemMutation } from "../../redux/Admin/userAPI";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Products({ products = [], loading, appliedFilters }) {
  
  const user = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // FILTER LOGIC
  const filteredProducts = useMemo(() => {
    let list = [...products];

    const filters = appliedFilters;

    if (!filters) return list;

    // Subcategory
    if (filters.subCategoryId) {
      list = list.filter(
        (p) => p.subCategory?._id === filters.subCategoryId
      );
    }

    // Price range
    list = list.filter((p) => {
      const price = Number(p.finalPrice ?? p.price);
      return (
        price >= filters.priceRange.min &&
        price <= filters.priceRange.max
      );
    });

    // Discount only
    if (filters.discountOnly) {
      list = list.filter((p) => p.discount >= filters.minDiscount);
    }

    // Rating
    list = list.filter((p) => (p.rating ?? 0) >= filters.minRating);

    // Sorting
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


  const [addcart] = useAddCartItemMutation();

  async function addCart(e, productId) {
    try {
      e.preventDefault();

     const res = await addcart({
        userId: user.id,
        productId,
      });
      if(res.error){
        toast.error("Plies Login First");
      }
      else{
        toast.success("Item Added");

      }
    } catch (error) {
      toast.error("Error In Add to cart Login Again");
    } 
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
    hover: {
      scale: 1.03,
      y: -4,
      boxShadow: "0 20px 45px rgba(99,102,241,0.25)",
      transition: { duration: 0.25 },
    },
  };

  return (
    <div className="px-6 md:px-16 py-12 bg-black text-white min-h-screen w-full">

      {/* LOADER */}
      {loading && (
        <div className="mt-20 flex justify-center">
          <Loader />
        </div>
      )}

      {/* NO PRODUCTS */}
      {!loading && filteredProducts.length === 0 && (
        <p className="text-center text-white/60 mt-10">
          No products match your filters.
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-4 w-full">
        {filteredProducts.map((item, index) => (
          <Link key={item._id} to={`/product/${item._id}`}>
            <motion.div
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
              whileHover="hover"
              className="
                bg-white/5 border border-white/10 backdrop-blur-xl
                rounded-2xl overflow-hidden p-4 flex flex-col
                shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                transition-all cursor-pointer group
              "
            >
              {/* Image */}
              <div className="relative w-full h-56 rounded-xl overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {item.title.length > 30
                  ? item.title.slice(0, 30) + "…"
                  : item.title}
              </h3>

              {/* Price */}
              <div className="flex items-center gap-3 mt-2">
                <p className="text-indigo-400 font-semibold text-lg">
                  ₹{item.finalPrice}
                </p>
                {item.discount > 0 && (
                  <p className="text-white/40 line-through text-sm">
                    ₹{item.price}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={14}
                    className={
                      starIndex < Math.round(item.rating)
                        ? "text-indigo-400 fill-indigo-400"
                        : "text-white/20"
                    }
                  />
                ))}
                <span className="text-white/40 text-xs ml-1">
                  {item.rating}
                </span>
              </div>

              {/* Add to cart button */}
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  addCart(e, item._id);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="
                  mt-4 flex items-center justify-center gap-2
                  w-full py-2 rounded-full font-semibold
                  bg-indigo-400 text-black shadow-[0_0_25px_rgba(99,102,241,0.5)]
                  hover:shadow-[0_0_35px_rgba(99,102,241,0.8)]
                "
              >
                <ShoppingBag size={16} />
                Add to Cart
              </motion.button>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
