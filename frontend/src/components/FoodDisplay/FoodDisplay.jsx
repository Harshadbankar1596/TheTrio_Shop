import React, { useContext } from "react";
import { motion } from "framer-motion";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem"; // This will become ProductItem in theme

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div
      id="food-display"
      className="w-full px-6 py-10 md:px-16 text-white bg-black"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold mb-10 tracking-tight text-white text-center"
      >
        Featured Collection
      </motion.h2>

      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
      >
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 4,
                  boxShadow:
                    "0px 20px 40px rgba(0,0,0,0.45), 0px 0px 25px rgba(99,102,241,0.25)",
                }}
                className="rounded-xl bg-black/40 backdrop-blur-md border border-white/10 p-4 shadow-xl transition-all duration-300"
              >
                {/* Here FoodItem will get transformed look later */}
                <FoodItem
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </motion.div>
            );
          }
          return null;
        })}
      </motion.div>

      {/* Divider */}
      <motion.hr
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-20 border-white/10"
      />
    </div>
  );
};

export default FoodDisplay;