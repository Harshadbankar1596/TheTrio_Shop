import React from "react";
import { motion } from "framer-motion";
import { useGetCategoryQuery } from "../../redux/Admin/userAPI";
import { Link } from "react-router-dom";
const ExploreMenu = ({ category, setCategory }) => {
  const { data: apiCategories, isLoading } = useGetCategoryQuery();

  // FIX: backend returns { success: true, data: [...] }
  const categories = apiCategories?.data || [];

  return (
    <div
      id="explore-menu"
      className="w-full px-6 md:px-16 py-10 select-none bg-black text-white"
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold text-center tracking-tight"
      >
        Explore The Collection
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="text-center text-white/60 max-w-2xl mx-auto mt-5 leading-relaxed"
      >
        Minimal. Clean. Luxury fashion crafted with futuristic silhouettes and
        subtle elegance — curated for your modern style.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-12 mt-16">
        {/* Loading State */}
        {isLoading && (
          <p className="text-white/70 text-center">Loading categories...</p>
        )}

        {!isLoading && categories.length === 0 && (
          <p className="text-white/70 text-center">No categories found.</p>
        )}

        {categories.map((item, index) => (
          <Link to={`/category/${item._id}`}>
            <motion.div
              key={item._id}
              onClick={() =>
                setCategory((prev) => (prev === item.name ? "All" : item.name))
              }
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.1,
                rotateX: 6,
                y: -6,
              }}
              className="cursor-pointer flex flex-col items-center group"
            >
              <div
                className={`relative w-32 h-32 rounded-full overflow-hidden border transition-all duration-700
                ${category === item.name
                    ? "border-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.5)] scale-110"
                    : "border-white/10 group-hover:border-white/40"
                  }
              `}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.18]"
                />

                {category === item.name && (
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/25 to-transparent" />
                )}
              </div>

              <p
                className={`mt-4 text-sm font-semibold tracking-wide transition-all duration-300
                ${category === item.name
                    ? "text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.7)]"
                    : "text-white/80 group-hover:text-white"
                  }
              `}
              >
                {item.name}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.hr
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-24 border-white/10"
      />
    </div>
  );
};

export default ExploreMenu;