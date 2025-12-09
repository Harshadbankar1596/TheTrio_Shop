import React from "react";

const ShimmerOfMenu = () => {
  return (
    
      <div className="w-full flex flex-wrap justify-center gap-12 mt-16">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center animate-pulse">
            {/* Circle shimmer */}
            <div className="w-32 h-32 rounded-full bg-white/10" />

            {/* Text shimmer */}
            <div className="mt-4 w-20 h-4 rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    
  );
};

export default ShimmerOfMenu;
