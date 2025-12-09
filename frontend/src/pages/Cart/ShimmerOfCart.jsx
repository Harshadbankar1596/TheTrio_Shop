const CartShimmer = () => {
  return (
    <div className="w-full px-6 md:px-16 mt-16 text-white animate-pulse">
      <div className="bg-black/50 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl rounded-2xl p-6">

        {/* HEADER SHIMMER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl"></div>

            <div>
              <div className="h-5 w-32 bg-white/10 rounded mb-2"></div>
              <div className="h-3 w-40 bg-white/10 rounded"></div>
            </div>
          </div>

          <div className="text-right">
            <div className="h-3 w-16 bg-white/10 rounded ml-auto mb-2"></div>
            <div className="h-5 w-24 bg-white/10 rounded ml-auto"></div>
          </div>
        </div>

        {/* CART SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT SIDE ITEMS */}
          <div className="lg:col-span-8 space-y-5">

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="
                  p-4 rounded-2xl backdrop-blur-md 
                  bg-white/5 border border-white/10
                  grid grid-cols-3 md:grid-cols-6 items-center gap-4
                "
              >
                {/* IMAGE */}
                <div className="col-span-1">
                  <div className="w-24 h-24 rounded-xl bg-white/10"></div>
                </div>

                {/* TEXT BLOCK */}
                <div className="col-span-2 space-y-2">
                  <div className="h-4 w-32 bg-white/10 rounded"></div>
                  <div className="h-3 w-20 bg-white/10 rounded"></div>
                  <div className="h-3 w-16 bg-white/10 rounded"></div>
                </div>

                {/* PRICE (desktop only) */}
                <div className="hidden md:block text-right">
                  <div className="h-4 w-16 bg-white/10 rounded ml-auto"></div>
                </div>

                {/* TOTAL */}
                <div className="font-semibold text-white">
                  <div className="h-5 w-20 bg-white/10 rounded ml-auto md:ml-0"></div>
                </div>

                {/* REMOVE BUTTON */}
                <div className="text-right flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/10 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE SUMMARY */}
          <div className="lg:col-span-4 space-y-6">

            {/* ORDER SUMMARY */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-lg">
              <div className="h-4 w-36 bg-white/10 rounded"></div>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-white/10 rounded"></div>
                  <div className="h-3 w-16 bg-white/10 rounded"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-white/10 rounded"></div>
                  <div className="h-3 w-16 bg-white/10 rounded"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-3 w-24 bg-white/10 rounded"></div>
                  <div className="h-3 w-16 bg-white/10 rounded"></div>
                </div>

                <div className="flex justify-between mt-2">
                  <div className="h-5 w-20 bg-white/10 rounded"></div>
                  <div className="h-5 w-20 bg-white/10 rounded"></div>
                </div>

                {/* BUTTON */}
                <div className="w-full mt-4 h-10 bg-white/10 rounded-full"></div>
              </div>
            </div>

            {/* ADDRESS BLOCK */}
            <div className="p-6 rounded-2xl bg-black/30 border border-white/10">
              <div className="h-4 w-40 bg-white/10 rounded mb-3"></div>

              <div className="space-y-2">
                <div className="h-4 w-56 bg-white/10 rounded"></div>
                <div className="h-4 w-48 bg-white/10 rounded"></div>
                <div className="h-4 w-36 bg-white/10 rounded"></div>
                <div className="h-3 w-28 bg-white/10 rounded mt-2"></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CartShimmer;
