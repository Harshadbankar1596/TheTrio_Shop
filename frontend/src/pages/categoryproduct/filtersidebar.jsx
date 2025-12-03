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
    <div className="w-full lg:w-[280px] bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl text-white">

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

      {/* Subcategory Filter */}
      {subcategories.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-sm text-white/60">Subcategory</p>
          <select
            className="w-full bg-white/10 border border-white/20 p-2 rounded-lg"
            value={filters.subCategoryId || ""}
            onChange={(e) =>
              setFilters({ ...filters, subCategoryId: e.target.value || null })
            }
          >
            <option value="">All</option>
            {subcategories.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Price Range */}
      <div className="mb-5">
        <p className="mb-2 text-sm text-white/60">Price Range</p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 bg-white/10 border border-white/20 p-2 rounded-lg"
            value={filters.priceRange.min}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: { ...filters.priceRange, min: Number(e.target.value) },
              })
            }
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 bg-white/10 border border-white/20 p-2 rounded-lg"
            value={filters.priceRange.max}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: { ...filters.priceRange, max: Number(e.target.value) },
              })
            }
          />
        </div>
      </div>

      {/* Discount */}
      <div className="mb-5">
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={filters.discountOnly}
            onChange={(e) =>
              setFilters({ ...filters, discountOnly: e.target.checked })
            }
          />
          <p className="text-sm text-white/60">Discount Only</p>
        </label>

        {filters.discountOnly && (
          <input
            type="number"
            placeholder="Minimum %"
            className="w-full bg-white/10 border border-white/20 p-2 rounded-lg"
            value={filters.minDiscount}
            onChange={(e) =>
              setFilters({ ...filters, minDiscount: Number(e.target.value) })
            }
          />
        )}
      </div>

      {/* Rating */}
      <div className="mb-5">
        <p className="mb-2 text-sm text-white/60">Rating Above</p>
        <select
          value={filters.minRating}
          className="w-full bg-white/10 border border-white/20 p-2 rounded-lg"
          onChange={(e) =>
            setFilters({ ...filters, minRating: Number(e.target.value) })
          }
        >
          <option value={0}>All Ratings</option>
          <option value={1}>1 ★ & above</option>
          <option value={2}>2 ★ & above</option>
          <option value={3}>3 ★ & above</option>
          <option value={4}>4 ★ & above</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <p className="mb-2 text-sm text-white/60">Sort By</p>
        <select
          value={filters.sortBy}
          className="w-full bg-white/10 border border-white/20 p-2 rounded-lg"
          onChange={(e) =>
            setFilters({ ...filters, sortBy: e.target.value })
          }
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating-desc">Rating: High → Low</option>
          <option value="discount-desc">Discount: High → Low</option>
        </select>
      </div>

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        className="
          w-full bg-indigo-400 text-black font-semibold 
          py-2 rounded-lg transition hover:bg-indigo-300
        "
      >
        Apply Filters
      </button>

    </div>
  );
}
