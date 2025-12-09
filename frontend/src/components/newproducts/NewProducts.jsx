import React from "react";
import { useGetNewProductsQuery } from "../../redux/Admin/userAPI";
import { Link } from "react-router-dom";
import Shimmer from "./ShimmerOfProducts"
const NewProducts = () => {
  const { data, isLoading } = useGetNewProductsQuery();

  if (isLoading)
    return (
      <Shimmer />
    );

  const products = data?.products || [];

  return (
    <div className="bg-black py-12 px-6 sm:px-10 lg:px-16 text-white">
      {/* Premium Heading */}
      <h1 className="text-4xl flex justify-center items-center font-extrabold mb-10 bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text tracking-wide">
        New Arrivals
      </h1>

      {/* Premium Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((item) => (
          <Link
            to={`/product/${item._id}`}
            key={item._id}
            className="
              group relative 
               overflow-hidden
              backdrop-blur-xl
              transition-all duration-300
            "
          >
            {/* Product Image */}
            <div className="w-full h-56 sm:h-60 overflow-hidden">
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="
                  w-full h-full object-cover 
                  group-hover:scale-110 
                  transition-all duration-500
                "
              />
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Product Name */}
              <h2 className="text-base sm:text-lg font-semibold text-gray-200 line-clamp-2 group-hover:text-white transition">
                {item.title}
              </h2>

              {/* Price */}
              <div className="mt-2 flex items-center gap-2">
                <p className="text-xl font-bold text-green-400 tracking-wide">
                  ₹{item.finalPrice}
                </p>

                {item.discount > 0 && (
                  <p className="text-gray-500 line-through text-sm">
                    ₹{item.price}
                  </p>
                )}
              </div>

              {/* Discount Badge */}
              {item.discount > 0 && (
                <span
                  className="
                    mt-3 inline-block 
                    bg-gradient-to-r from-green-400 to-green-600 
                    text-black px-3 py-1 
                    rounded-md text-xs font-bold 
                    
                  "
                >
                  {item.discount}% OFF
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* If No products */}
      {products.length === 0 && (
        <p className="text-gray-400 mt-5">No new products available.</p>
      )}
    </div>
  );
};

export default NewProducts;
