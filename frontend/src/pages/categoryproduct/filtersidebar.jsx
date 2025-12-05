import React, { useMemo, useState } from "react";
import { X, Filter, RefreshCw } from "lucide-react";

export default function FilterSidebar({ products = [], onApply }) {
  const [open, setOpen] = useState(true);

  const [filters, setFilters] = useState({
    subCategoryId: null,
    priceRange: { min: 0, max: 100000 },
    discountOnly: false,
    minDiscount: 0,
    minRating: 0,
    sortBy: "",
  });

  const subcategories = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      if (p.subCategory?._id) {
        map[p.subCategory._id] = p.subCategory.name;
      }
    });
    return Object.entries(map).map(([id, name]) => ({ id, name }));
  }, [products]);

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
    });
    onApply(null);
  }

  return (
    <div
      className="
        w-full lg:w-[280px]
        bg-white/10 backdrop-blur-2xl 
        border border-white/20 
        shadow-[0_20px_60px_rgba(0,0,0,0.4)]
        rounded-2xl p-6 text-white 
        sticky top-24
        transition-all
        hover:shadow-[0_30px_80px_rgba(99,102,241,0.25)]
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter size={18} /> Filters
        </h3>

        <button
          onClick={resetFilters}
          className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-sm"
        >
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {/* Subcategory */}
      {subcategories.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-sm text-white/70">Subcategory</p>
          <select
            className="
              w-full bg-white/10 
              border border-white/30 
              p-2 rounded-lg 
              text-white
              placeholder-white/50
            "
            value={filters.subCategoryId || ""}
            onChange={(e) =>
              setFilters({ ...filters, subCategoryId: e.target.value || null })
            }
          >
            <option value="" className="text-black">
              All
            </option>
            {subcategories.map((s) => (
              <option key={s.id} value={s.id} className="text-black">
                {s.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Price Range */}
      <div className="mb-5">
        <p className="mb-2 text-sm text-white/70">Price Range</p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="
              w-1/2 bg-white/10 
              border border-white/30 
              p-2 rounded-lg 
              text-white placeholder-white/50
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

          <input
            type="number"
            placeholder="Max"
            className="
              w-1/2 bg-white/10 
              border border-white/30 
              p-2 rounded-lg 
              text-white placeholder-white/50
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
      </div>

      {/* Discount */}
      <div className="mb-5">
        <label className="flex items-center gap-2 mb-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.discountOnly}
            onChange={(e) =>
              setFilters({ ...filters, discountOnly: e.target.checked })
            }
          />
          <p className="text-sm text-white/70">Discount Only</p>
        </label>

        {filters.discountOnly && (
          <input
            type="number"
            placeholder="Minimum %"
            className="
              w-full bg-white/10 
              border border-white/30 
              p-2 rounded-lg
              text-white placeholder-white/50
            "
            value={filters.minDiscount}
            onChange={(e) =>
              setFilters({ ...filters, minDiscount: Number(e.target.value) })
            }
          />
        )}
      </div>

      {/* Rating */}
      <div className="mb-5">
        <p className="mb-2 text-sm text-white/70">Rating Above</p>
        <select
          value={filters.minRating}
          className="
            w-full bg-white/10 
            border border-white/30 
            p-2 rounded-lg 
            text-white
          "
          onChange={(e) =>
            setFilters({ ...filters, minRating: Number(e.target.value) })
          }
        >
          <option value={0} className="text-black">All Ratings</option>
          <option value={1} className="text-black">1 ★ & up</option>
          <option value={2} className="text-black">2 ★ & up</option>
          <option value={3} className="text-black">3 ★ & up</option>
          <option value={4} className="text-black">4 ★ & up</option>
        </select>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <p className="mb-2 text-sm text-white/70">Sort By</p>
        <select
          value={filters.sortBy}
          className="
            w-full bg-white/10 
            border border-white/30 
            p-2 rounded-lg 
            text-white
          "
          onChange={(e) =>
            setFilters({ ...filters, sortBy: e.target.value })
          }
        >
          <option value="" className="text-black">Default</option>
          <option value="price-asc" className="text-black">Price: Low → High</option>
          <option value="price-desc" className="text-black">Price: High → Low</option>
          <option value="rating-desc" className="text-black">Rating: High → Low</option>
          <option value="discount-desc" className="text-black">Discount: High → Low</option>
        </select>
      </div>

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        className="
          w-full py-2 rounded-lg 
          bg-indigo-400 text-black font-semibold 
          transition hover:bg-indigo-300
          shadow-[0_0_25px_rgba(99,102,241,0.5)]
        "
      >
        Apply Filters
      </button>
    </div>
  );
}