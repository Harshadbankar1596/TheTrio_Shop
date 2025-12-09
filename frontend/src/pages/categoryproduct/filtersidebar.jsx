import React, { useMemo, useState } from "react";
import { X, RefreshCw, ChevronDown } from "lucide-react";

export default function FilterSidebar({ products = [], onApply }) {
  const [filters, setFilters] = useState({
    subCategoryId: null,
    priceRange: { min: 0, max: 100000 },
    discountOnly: false,
    minDiscount: 0,
    minRating: 0,
    sortBy: "",
    brand: null,
  });

  const [openPrice, setOpenPrice] = useState(true);
  const [openBrand, setOpenBrand] = useState(true);

  function applyFilters() {
    onApply(filters);
  }

  function resetFilters() {
    setFilters({
      subCategoryId: null,
      priceRange: { min: 0, max: 100000 },
      discountOnly: false,
      minDiscount: 0,
      minRating: 0,
      sortBy: "",
      brand: null,
    });
    onApply(null);
  }

  return (
    <div
      className="
      w-full lg:w-[280px]
      bg-[#0f0f0f]/95
      border border-[#1b1b1b]
      rounded-2xl
      p-5
      text-white
      sticky top-24
      space-y-8
      backdrop-blur-xl
      shadow-[0_12px_40px_rgba(0,0,0,0.4)]
      transition-all
    "
    >
      {/* RESET */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <p className="text-[16px] font-semibold">Filters</p>

        <button
          onClick={resetFilters}
          className="
            p-2 rounded-lg 
            bg-[#1b1b1b] 
            hover:bg-[#262626] 
            transition
          "
        >
          <RefreshCw size={16} className="text-gray-300" />
        </button>
      </div>

      {/* PRICE FILTER */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setOpenPrice(!openPrice)}
        >
          <p className="text-[17px] font-medium">Price</p>

          <ChevronDown
            size={18}
            className={`text-gray-300 transform transition ${
              openPrice ? "rotate-180" : ""
            }`}
          />
        </div>

        {openPrice && (
          <div className="mt-4 flex gap-3">
            {/* MIN */}
            <input
              type="number"
              placeholder="Min"
              className="
                w-1/2 bg-[#1a1a1a]
                border border-[#2a2a2a]
                rounded-xl p-2 
                text-white text-sm
                focus:border-green-500
                outline-none
              "
              value={filters.priceRange.min}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: {
                    ...filters.priceRange,
                    min: Number(e.target.value),
                  },
                })
              }
            />

            {/* MAX */}
            <input
              type="number"
              placeholder="Max"
              className="
                w-1/2 bg-[#1a1a1a]
                border border-[#2a2a2a]
                rounded-xl p-2 
                text-white text-sm
                focus:border-green-500
                outline-none
              "
              value={filters.priceRange.max}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: {
                    ...filters.priceRange,
                    max: Number(e.target.value),
                  },
                })
              }
            />
          </div>
        )}
      </div>

      {/* BRAND FILTER */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setOpenBrand(!openBrand)}
        >
          <p className="text-[17px] font-medium">Brand</p>

          <ChevronDown
            size={18}
            className={`text-gray-300 transform transition ${
              openBrand ? "rotate-180" : ""
            }`}
          />
        </div>

        {openBrand && (
          <>
            {/* SEARCH INPUT */}
            <div className="mt-3">
              <input
                placeholder="Search... (soon)"
                disabled
                className="
                w-full bg-[#1a1a1a]
                border border-[#2a2a2a]
                rounded-xl p-2 
                text-white text-sm placeholder-gray-500
                opacity-70 cursor-not-allowed
              "
              />
            </div>

            {/* BRAND LIST */}
            <div className="mt-4 space-y-3">
              {["USPOLO", "PUMA"].map((brand) => (
                <label
                  key={brand}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      brand: filters.brand === brand ? null : brand,
                    })
                  }
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <div
                    className={`
                      w-5 h-5 rounded-md border border-[#3a3a3a]
                      flex items-center justify-center text-[10px]
                      transition
                      ${
                        filters.brand === brand
                          ? "bg-[#e1ff3f] border-[#e1ff3f]"
                          : "bg-transparent"
                      }
                  `}
                  ></div>

                  <span
                    className={`
                      ${
                        filters.brand === brand
                          ? "text-white font-medium"
                          : "text-gray-300"
                      }
                    `}
                  >
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </>
        )}
      </div>

      {/* APPLY BUTTON */}
      <button
        onClick={applyFilters}
        className="
        w-full py-3 rounded-xl
        bg-green-500
        hover:bg-green-600 active:scale-95
        transition text-black font-semibold
      "
      >
        Apply Filters
      </button>
    </div>
  );
}
