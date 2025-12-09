export const ProductPageShimmer = () => {
  return (
    <div className="min-h-screen bg-[#131415] text-white px-4 sm:px-6 lg:px-12 py-12 animate-pulse">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* LEFT IMAGES */}
        <div className="lg:col-span-5 flex gap-6">

          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-20 h-28 rounded-xl bg-[#1f1f1f]"
              ></div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <div className="bg-[#1d1d1f] rounded-2xl h-[550px]"></div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-7 space-y-8">

          {/* Breadcrumb */}
          <div className="h-4 w-52 bg-[#1f1f1f] rounded"></div>

          {/* Hot label */}
          <div className="h-3 w-24 bg-[#1f1f1f] rounded"></div>

          {/* Title */}
          <div className="h-8 w-80 bg-[#1f1f1f] rounded"></div>

          {/* Designer text */}
          <div className="h-4 w-48 bg-[#1f1f1f] rounded"></div>

          {/* Price */}
          <div className="space-y-2">
            <div className="h-6 w-40 bg-[#1f1f1f] rounded"></div>
            <div className="h-4 w-28 bg-[#1f1f1f] rounded"></div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-72 bg-[#1f1f1f] rounded"></div>
            <div className="h-4 w-64 bg-[#1f1f1f] rounded"></div>
            <div className="h-4 w-56 bg-[#1f1f1f] rounded"></div>
          </div>

          {/* Size selector */}
          <div>
            <div className="h-4 w-32 bg-[#1f1f1f] rounded mb-3"></div>
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-[#1f1f1f] rounded-full"
                ></div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <div className="h-4 w-28 bg-[#1f1f1f] rounded mb-3"></div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#1f1f1f] rounded-lg"></div>
              <div className="w-8 h-8 bg-[#1f1f1f] rounded"></div>
              <div className="w-10 h-10 bg-[#1f1f1f] rounded-lg"></div>
            </div>
            <div className="h-3 w-32 bg-[#1f1f1f] rounded mt-3"></div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 mt-6">
            <div className="flex-1 h-12 bg-[#1f1f1f] rounded-xl"></div>
            <div className="flex-1 h-12 bg-[#1f1f1f] rounded-xl"></div>
          </div>

          {/* Product details */}
          <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-5">
            <div className="h-4 w-64 bg-[#1f1f1f] rounded"></div>
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-[#2a2a2a] rounded-full"></span>
              <span className="w-2 h-2 bg-[#2a2a2a] rounded-full"></span>
              <span className="w-2 h-2 bg-[#2a2a2a] rounded-full"></span>
            </div>
          </div>

          {/* Reviews */}
          <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-5">
            <div className="h-4 w-40 bg-[#1f1f1f] rounded"></div>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-5 h-5 bg-[#2a2a2a] rounded"></div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


export const ReviewShimmer = () => {
  return (
    <section className="mt-20 max-w-5xl mx-auto animate-pulse">
      <div
        className="
          bg-white/5 
          border border-white/10 
          rounded-3xl 
          p-8 
          backdrop-blur-xl 
          shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="h-3 w-32 bg-white/10 rounded"></div>
            <div className="h-6 w-48 bg-white/10 rounded"></div>
          </div>

          <div className="h-10 w-36 bg-white/10 rounded-full"></div>
        </div>

        {/* SHIMMER REVIEW CARDS */}
        <div className="space-y-4 max-h-[380px] overflow-hidden">

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                bg-white/5 
                border border-white/10 
                p-5 
                rounded-2xl
                shadow-md
              "
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className="w-4 h-4 bg-white/10 rounded"
                  ></div>
                ))}
              </div>

              {/* Description Lines */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-white/10 rounded"></div>
                <div className="h-3 w-5/6 bg-white/10 rounded"></div>
                <div className="h-3 w-3/5 bg-white/10 rounded"></div>
              </div>

              {/* User */}
              <div className="h-3 w-24 bg-white/10 rounded mt-3"></div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

