// import React, { useState } from "react";
// import FilterSidebar from "./filtersidebar";
// import Products from "./products";
// import { useParams } from "react-router-dom";
// import { useGetProductsByCategoryQuery } from "../../redux/Admin/userAPI";

// export default function MainSection() {
//     const { id } = useParams();

//     const { data, isLoading } = useGetProductsByCategoryQuery(id);
//     const products = data?.data || [];

//     const [filters, setFilters] = useState(null);

//     return (
//         <div className="w-full flex flex-col lg:flex-row ">

//             <div className="hidden lg:block w-[280px] mt-12">
//                 <FilterSidebar
//                     products={products}
//                     onApply={setFilters}
//                 />
//             </div>

//             <div className="flex-1">
//                 <Products
//                     products={products}
//                     appliedFilters={filters}
//                     loading={isLoading}
//                 />
//             </div>

//         </div>
//     );
// }

import React, { useState } from "react";
import { Filter, Menu, X } from "lucide-react";
import FilterSidebar from "./filtersidebar";
import Products from "./products";
import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../../redux/Admin/userAPI";

export default function MainSection() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductsByCategoryQuery(id);
  const products = data?.data || [];
  const [filters, setFilters] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Filter Button */}
      <div className="lg:hidden sticky top-0 z-40 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium"
            >
              <Filter size={18} />
              Filters
            </button>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Showing</p>
              <p className="text-white font-semibold">
                {products.length} products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-[320px] bg-gray-900 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-400" />
                </button>
              </div>
              <FilterSidebar
                products={products}
                onApply={(filters) => {
                  setFilters(filters);
                  setMobileFiltersOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-8">
          {/* Filter Sidebar */}
          <div className="w-[320px] flex-shrink-0">
            <div className="sticky top-6">
              <FilterSidebar products={products} onApply={setFilters} />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Header for Desktop */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Products
                  </h1>
                  <p className="text-gray-400">
                    Discover our curated collection
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Showing</p>
                  <p className="text-white font-semibold text-lg">
                    {products.length}{" "}
                    {products.length === 1 ? "product" : "products"}
                  </p>
                </div>
              </div>
            </div>

            {/* Active Filters Badge */}
            {filters && (
              <div className="mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Active filters:</span>
                    <div className="flex flex-wrap gap-2">
                      {filters.subCategoryId && (
                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                          Category
                        </span>
                      )}
                      {(filters.priceRange.min > 0 ||
                        filters.priceRange.max < 100000) && (
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                          Price Range
                        </span>
                      )}
                      {filters.discountOnly && (
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                          Discount
                        </span>
                      )}
                      {filters.minRating > 0 && (
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                          {filters.minRating}+ Stars
                        </span>
                      )}
                      {filters.sortBy && (
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          Sorted
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setFilters(null)}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}

            {/* Products Component */}
            <Products
              products={products}
              appliedFilters={filters}
              loading={isLoading}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Products Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Products</h1>
            <p className="text-gray-400">Discover our curated collection</p>
          </div>

          {/* Active Filters for Mobile */}
          {filters && (
            <div className="mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-sm">Active filters</span>
                <button
                  onClick={() => setFilters(null)}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.subCategoryId && (
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                    Category
                  </span>
                )}
                {(filters.priceRange.min > 0 ||
                  filters.priceRange.max < 100000) && (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                    Price Range
                  </span>
                )}
                {filters.discountOnly && (
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                    Discount
                  </span>
                )}
                {filters.minRating > 0 && (
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                    {filters.minRating}+ Stars
                  </span>
                )}
                {filters.sortBy && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                    Sorted
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Products Component for Mobile */}
          <Products
            products={products}
            appliedFilters={filters}
            loading={isLoading}
          />
        </div>

        {/* Floating Action Button for Mobile */}
        {filters && (
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-30 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
          >
            <Filter size={24} className="text-white" />
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Showing {products.length} of {products.length} products
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
