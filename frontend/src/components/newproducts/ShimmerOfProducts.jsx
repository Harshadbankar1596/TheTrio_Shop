import React from 'react'

const ShimmerOfProducts = () => {
  return (
   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
    {[...Array(8)].map((_, idx) => (
      <div
        key={idx}
        className="animate-pulse bg-white/5 rounded-xl overflow-hidden"
      >
        {/* Image shimmer */}
        <div className="w-full h-56 sm:h-60 bg-white/10"></div>

        {/* Content shimmer */}
        <div className="p-4 space-y-3">
          {/* Title line 1 */}
          <div className="w-3/4 h-4 bg-white/10 rounded"></div>

          {/* Title line 2 */}
          <div className="w-1/2 h-4 bg-white/10 rounded"></div>

          {/* Price shimmer */}
          <div className="w-1/3 h-5 bg-white/10 rounded mt-2"></div>

          {/* Discount shimmer */}
          <div className="w-20 h-4 bg-white/10 rounded"></div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default ShimmerOfProducts
