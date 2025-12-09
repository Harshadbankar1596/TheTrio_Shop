export default function OrdersShimmer() {
  return (
    <div className="p-5 bg-black min-h-screen text-white animate-pulse">
      {/* PAGE TITLE */}
      <div className="h-6 w-40 bg-[#1a1a1a] rounded mb-5"></div>

      <div className="space-y-5">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-xl shadow-md border border-gray-700 bg-[#111]"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <div className="space-y-2">
                <div className="h-5 w-48 bg-[#1a1a1a] rounded"></div>
                <div className="h-4 w-32 bg-[#1a1a1a] rounded"></div>
              </div>

              <div className="h-6 w-24 bg-[#1a1a1a] rounded-full"></div>
            </div>

            {/* PRODUCT LIST */}
            <div className="space-y-4">
              {[1, 2].map((x) => (
                <div
                  key={x}
                  className="flex items-center gap-4 bg-[#111827] border border-gray-700 rounded-lg p-4"
                >
                  {/* IMAGE */}
                  <div className="w-20 h-20 bg-[#1a1a1a] rounded-md"></div>

                  {/* TEXT INFO */}
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-40 bg-[#1a1a1a] rounded"></div>
                    <div className="h-3 w-32 bg-[#1a1a1a] rounded"></div>
                    <div className="h-3 w-24 bg-[#1a1a1a] rounded"></div>
                  </div>

                  {/* PRICE */}
                  <div className="text-right space-y-2">
                    <div className="h-4 w-16 bg-[#1a1a1a] rounded"></div>
                    <div className="h-3 w-12 bg-[#1a1a1a] rounded"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* ADDRESS */}
            <div className="mt-4 space-y-2">
              <div className="h-4 w-60 bg-[#1a1a1a] rounded"></div>
              <div className="h-4 w-40 bg-[#1a1a1a] rounded"></div>
            </div>

            {/* TRACKING STEPS */}
            <div className="mt-6 space-y-2">
              <div className="h-4 w-40 bg-[#1a1a1a] rounded mb-4"></div>

              <div className="flex justify-between items-center w-full">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex flex-col items-center w-full">
                    {/* LINE */}
                    {j !== 1 && (
                      <div className="w-full h-1 bg-[#1a1a1a] -ml-4 mb-2"></div>
                    )}

                    {/* CIRCLE */}
                    <div className="w-6 h-6 bg-[#1a1a1a] rounded-full"></div>

                    {/* LABEL */}
                    <div className="h-3 w-16 bg-[#1a1a1a] rounded mt-2"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-6">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-[#1a1a1a] rounded"></div>
                <div className="h-3 w-20 bg-[#1a1a1a] rounded"></div>
              </div>

              <div className="h-9 w-28 bg-[#1a1a1a] rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}