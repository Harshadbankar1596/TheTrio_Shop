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
      bg-[#0f0f0f]
      border border-[#1b1b1b]
      rounded-2xl
      p-5
      text-white
      sticky top-24
      space-y-6
    "
  >
    {/* RESET FILTERS */}
    <div className="flex items-center justify-between">
      <p className="text-[15px] font-medium text-white">Reset filters</p>

      <button
        onClick={resetFilters}
        className="p-2 rounded-lg bg-[#1b1b1b] hover:bg-[#262626] transition"
      >
        <RefreshCw size={16} className="text-gray-300" />
      </button>
    </div>

    {/* ACTIVE TAGS PREVIEW (Optional UI) */}
    <div className="flex flex-wrap gap-2">
      {filters.subCategoryId && (
        <span className="bg-[#1e1e1e] px-3 py-1 rounded-full text-sm text-gray-200 flex items-center gap-1">
          Subcategory <X size={14} />
        </span>
      )}
    </div>

    {/* PRICE */}
    <div>
      <div className="flex items-center justify-between cursor-pointer">
        <p className="text-[17px] text-white">Price</p>
        <span className="text-gray-300 text-lg">⌄</span>
      </div>

      <div className="mt-3 flex gap-3">
        <input
          type="number"
          className="
            w-1/2 bg-[#1a1a1a]
            border border-[#2a2a2a]
            rounded-xl p-2 text-white text-sm
          "
          placeholder="Min"
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
          className="
            w-1/2 bg-[#1a1a1a]
            border border-[#2a2a2a]
            rounded-xl p-2 text-white text-sm
          "
          placeholder="Max"
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

    {/* BRAND FILTER */}
    <div>
      <div className="flex items-center justify-between cursor-pointer">
        <p className="text-[17px] text-white">Brand</p>
        <span className="text-gray-300 text-lg">⌄</span>
      </div>

      {/* Search Input */}
      <div className="mt-3">
        <input
          placeholder="Search brands"
          className="
            w-full bg-[#1a1a1a]
            border border-[#2a2a2a]
            rounded-xl p-2 text-white text-sm placeholder-gray-500
          "
        />
      </div>

      {/* Brand List (Static UI) */}
      <div className="mt-3 space-y-3">
        {["Apple", "LG", "KitchenAid", "SMEG", "Samsung", "Sony", "Remez"].map(
          (brand) => (
            <label
              key={brand}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <div
                className={`
                  w-5 h-5 rounded-md border border-[#3a3a3a]
                  flex items-center justify-center text-[10px]
                  ${
                    filters.brand === brand
                      ? "bg-[#e1ff3f] border-[#e1ff3f]"
                      : "bg-transparent"
                  }
                `}
              >
                {filters.brand === brand && <Check size={14} className="text-black" />}
              </div>

              <span className="text-gray-300">{brand}</span>
            </label>
          )
        )}
      </div>
    </div>

    {/* APPLY BUTTON */}
    <button
      onClick={applyFilters}
      className="
        w-full py-3 rounded-xl
        bg-green-500
        hover:bg-green-700 transition
        text-black
      "
    >
      Apply Filters
    </button>
  </div>
);
;
}


// import React, { useMemo, useState } from "react";
// import { 
//   Filter, 
//   RefreshCw, 
//   ChevronDown, 
//   ChevronUp, 
//   DollarSign, 
//   Tag, 
//   Star, 
//   TrendingUp,
//   X,
//   Check
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function FilterSidebar({ products = [], onApply }) {
//   const [filters, setFilters] = useState({
//     subCategoryId: null,
//     priceRange: { min: 0, max: 100000 },
//     discountOnly: false,
//     minDiscount: 20,
//     minRating: 0,
//     sortBy: "",
//   });

//   const [expandedSections, setExpandedSections] = useState({
//     category: true,
//     price: true,
//     discount: true,
//     rating: true,
//     sort: true
//   });

//   const subcategories = useMemo(() => {
//     const map = {};
//     products.forEach((p) => {
//       if (p.subCategory?._id) {
//         map[p.subCategory._id] = {
//           name: p.subCategory.name,
//           count: (map[p.subCategory._id]?.count || 0) + 1
//         };
//       }
//     });
//     return Object.entries(map).map(([id, data]) => ({ 
//       id, 
//       name: data.name,
//       count: data.count
//     }));
//   }, [products]);

//   function applyFilters() {
//     onApply(filters);
//   }

//   function resetFilters() {
//     const resetValues = {
//       subCategoryId: null,
//       priceRange: { min: 0, max: 100000 },
//       discountOnly: false,
//       minDiscount: 20,
//       minRating: 0,
//       sortBy: "",
//     };
//     setFilters(resetValues);
//     onApply(null);
//   }

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const priceMarks = [0, 25000, 50000, 75000, 100000];

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.3 }}
//       className="
//         w-full lg:w-[320px]
//         bg-gradient-to-b from-gray-900/95 to-gray-800/95
//         border border-gray-700/50
//         rounded-2xl
//         p-6
//         backdrop-blur-xl
//         shadow-2xl
//         sticky top-24
//         h-fit
//       "
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
//             <Filter size={20} className="text-white" />
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-white">Filters</h3>
//             <p className="text-gray-400 text-sm mt-1">
//               Refine your search
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={resetFilters}
//           className="
//             p-2
//             hover:bg-gray-700/50
//             rounded-lg
//             transition-all duration-300
//             group
//           "
//           title="Reset all filters"
//         >
//           <RefreshCw size={18} className="text-gray-400 group-hover:text-white transition-colors" />
//         </button>
//       </div>

//       {/* Active Filters Badge */}
//       <div className="mb-6">
//         <div className="flex items-center justify-between">
//           <span className="text-gray-400 text-sm">Active filters</span>
//           <span className="
//             bg-indigo-500/20
//             text-indigo-300
//             text-xs
//             px-3 py-1
//             rounded-full
//             font-medium
//           ">
//             {[
//               filters.subCategoryId ? 1 : 0,
//               filters.priceRange.min > 0 || filters.priceRange.max < 100000 ? 1 : 0,
//               filters.discountOnly ? 1 : 0,
//               filters.minRating > 0 ? 1 : 0,
//               filters.sortBy ? 1 : 0
//             ].reduce((a, b) => a + b, 0)} applied
//           </span>
//         </div>
//       </div>

//       <div className="space-y-6">
//         {/* Category Section */}
//         <div className="border-b border-gray-700/50 pb-6">
//           <button
//             onClick={() => toggleSection('category')}
//             className="w-full flex items-center justify-between mb-4"
//           >
//             <div className="flex items-center gap-2">
//               <div className="w-1 h-4 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full"></div>
//               <span className="font-semibold text-white">Category</span>
//             </div>
//             {expandedSections.category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//           </button>

//           <AnimatePresence>
//             {expandedSections.category && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="space-y-3"
//               >
//                 <button
//                   onClick={() => setFilters({ ...filters, subCategoryId: null })}
//                   className={`
//                     w-full flex items-center justify-between p-3 rounded-lg transition-all
//                     ${!filters.subCategoryId ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30' : 'hover:bg-gray-700/50'}
//                   `}
//                 >
//                   <span className={!filters.subCategoryId ? "text-white font-medium" : "text-gray-300"}>
//                     All Categories
//                   </span>
//                   <span className="text-gray-400 text-sm">{products.length} items</span>
//                 </button>

//                 {subcategories.map((sub) => (
//                   <button
//                     key={sub.id}
//                     onClick={() => setFilters({ ...filters, subCategoryId: sub.id })}
//                     className={`
//                       w-full flex items-center justify-between p-3 rounded-lg transition-all
//                       ${filters.subCategoryId === sub.id ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30' : 'hover:bg-gray-700/50'}
//                     `}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className={`
//                         w-2 h-2 rounded-full transition-all
//                         ${filters.subCategoryId === sub.id ? 'bg-indigo-400' : 'bg-gray-600'}
//                       `}></div>
//                       <span className={filters.subCategoryId === sub.id ? "text-white font-medium" : "text-gray-300"}>
//                         {sub.name}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-400 text-sm">{sub.count}</span>
//                       {filters.subCategoryId === sub.id && (
//                         <Check size={16} className="text-indigo-400" />
//                       )}
//                     </div>
//                   </button>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Price Range Section */}
//         <div className="border-b border-gray-700/50 pb-6">
//           <button
//             onClick={() => toggleSection('price')}
//             className="w-full flex items-center justify-between mb-4"
//           >
//             <div className="flex items-center gap-2">
//               <DollarSign size={16} className="text-emerald-400" />
//               <span className="font-semibold text-white">Price Range</span>
//             </div>
//             {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//           </button>

//           <AnimatePresence>
//             {expandedSections.price && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//               >
//                 <div className="space-y-4">
//                   {/* Price Inputs */}
//                   <div className="flex items-center gap-3">
//                     <div className="flex-1">
//                       <label className="text-gray-400 text-sm mb-1 block">Min</label>
//                       <div className="relative">
//                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
//                         <input
//                           type="number"
//                           value={filters.priceRange.min}
//                           onChange={(e) => setFilters({
//                             ...filters,
//                             priceRange: { ...filters.priceRange, min: Number(e.target.value) }
//                           })}
//                           className="
//                             w-full pl-8 pr-3 py-2.5
//                             bg-gray-800/50
//                             border border-gray-600
//                             rounded-lg
//                             text-white
//                             focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500
//                             transition-all
//                           "
//                         />
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <label className="text-gray-400 text-sm mb-1 block">Max</label>
//                       <div className="relative">
//                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
//                         <input
//                           type="number"
//                           value={filters.priceRange.max}
//                           onChange={(e) => setFilters({
//                             ...filters,
//                             priceRange: { ...filters.priceRange, max: Number(e.target.value) }
//                           })}
//                           className="
//                             w-full pl-8 pr-3 py-2.5
//                             bg-gray-800/50
//                             border border-gray-600
//                             rounded-lg
//                             text-white
//                             focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500
//                             transition-all
//                           "
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Price Marks */}
//                   <div className="flex justify-between text-xs text-gray-400 px-1">
//                     {priceMarks.map((mark) => (
//                       <button
//                         key={mark}
//                         onClick={() => setFilters({
//                           ...filters,
//                           priceRange: { min: mark === 0 ? 0 : mark - 25000, max: mark }
//                         })}
//                         className="hover:text-emerald-400 transition-colors"
//                       >
//                         ₹{mark.toLocaleString()}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Discount Section */}
//         <div className="border-b border-gray-700/50 pb-6">
//           <button
//             onClick={() => toggleSection('discount')}
//             className="w-full flex items-center justify-between mb-4"
//           >
//             <div className="flex items-center gap-2">
//               <Tag size={16} className="text-amber-400" />
//               <span className="font-semibold text-white">Discount</span>
//             </div>
//             {expandedSections.discount ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//           </button>

//           <AnimatePresence>
//             {expandedSections.discount && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//               >
//                 <div className="space-y-4">
//                   {/* Toggle */}
//                   <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-all cursor-pointer">
//                     <div className="flex items-center gap-3">
//                       <div className={`
//                         relative w-10 h-6 rounded-full transition-all duration-300
//                         ${filters.discountOnly ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gray-700'}
//                       `}>
//                         <div className={`
//                           absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300
//                           ${filters.discountOnly ? 'left-5' : 'left-1'}
//                         `}></div>
//                       </div>
//                       <span className={filters.discountOnly ? "text-white font-medium" : "text-gray-300"}>
//                         Show discounted items only
//                       </span>
//                     </div>
//                     <input
//                       type="checkbox"
//                       checked={filters.discountOnly}
//                       onChange={(e) => setFilters({ ...filters, discountOnly: e.target.checked })}
//                       className="hidden"
//                     />
//                   </label>

//                   {/* Discount Slider */}
//                   {filters.discountOnly && (
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-300">Minimum discount</span>
//                         <span className="text-amber-400 font-bold">{filters.minDiscount}%</span>
//                       </div>
//                       <input
//                         type="range"
//                         min="10"
//                         max="70"
//                         step="10"
//                         value={filters.minDiscount}
//                         onChange={(e) => setFilters({ ...filters, minDiscount: Number(e.target.value) })}
//                         className="
//                           w-full h-2
//                           bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-red-500/30
//                           rounded-lg
//                           appearance-none
//                           [&::-webkit-slider-thumb]:appearance-none
//                           [&::-webkit-slider-thumb]:h-4
//                           [&::-webkit-slider-thumb]:w-4
//                           [&::-webkit-slider-thumb]:rounded-full
//                           [&::-webkit-slider-thumb]:bg-gradient-to-r
//                           [&::-webkit-slider-thumb]:from-amber-400
//                           [&::-webkit-slider-thumb]:to-orange-400
//                           [&::-webkit-slider-thumb]:border-2
//                           [&::-webkit-slider-thumb]:border-white
//                         "
//                       />
//                       <div className="flex justify-between text-xs text-gray-400">
//                         {[10, 30, 50, 70].map((val) => (
//                           <button
//                             key={val}
//                             onClick={() => setFilters({ ...filters, minDiscount: val })}
//                             className={`px-2 py-1 rounded ${filters.minDiscount === val ? 'bg-amber-500/20 text-amber-300' : 'hover:text-amber-400'}`}
//                           >
//                             {val}%
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Rating Section */}
//         <div className="border-b border-gray-700/50 pb-6">
//           <button
//             onClick={() => toggleSection('rating')}
//             className="w-full flex items-center justify-between mb-4"
//           >
//             <div className="flex items-center gap-2">
//               <Star size={16} className="text-yellow-400" />
//               <span className="font-semibold text-white">Rating</span>
//             </div>
//             {expandedSections.rating ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//           </button>

//           <AnimatePresence>
//             {expandedSections.rating && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="space-y-3"
//               >
//                 {[4, 3, 2, 1, 0].map((rating) => (
//                   <button
//                     key={rating}
//                     onClick={() => setFilters({ ...filters, minRating: rating })}
//                     className={`
//                       w-full flex items-center justify-between p-3 rounded-lg transition-all
//                       ${filters.minRating === rating ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30' : 'hover:bg-gray-700/50'}
//                     `}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="flex">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             size={16}
//                             className={
//                               i < rating
//                                 ? "text-yellow-400 fill-yellow-400"
//                                 : "text-gray-600"
//                             }
//                           />
//                         ))}
//                       </div>
//                       <span className={filters.minRating === rating ? "text-white font-medium" : "text-gray-300"}>
//                         {rating === 0 ? 'All Ratings' : `${rating}+ Stars`}
//                       </span>
//                     </div>
//                     {filters.minRating === rating && (
//                       <Check size={16} className="text-yellow-400" />
//                     )}
//                   </button>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Sort Section */}
//         <div className="pb-6">
//           <button
//             onClick={() => toggleSection('sort')}
//             className="w-full flex items-center justify-between mb-4"
//           >
//             <div className="flex items-center gap-2">
//               <TrendingUp size={16} className="text-purple-400" />
//               <span className="font-semibold text-white">Sort By</span>
//             </div>
//             {expandedSections.sort ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//           </button>

//           <AnimatePresence>
//             {expandedSections.sort && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="space-y-2"
//               >
//                 {[
//                   { value: "", label: "Recommended" },
//                   { value: "price-asc", label: "Price: Low to High" },
//                   { value: "price-desc", label: "Price: High to Low" },
//                   { value: "rating-desc", label: "Top Rated" },
//                   { value: "discount-desc", label: "Best Discount" }
//                 ].map((option) => (
//                   <button
//                     key={option.value}
//                     onClick={() => setFilters({ ...filters, sortBy: option.value })}
//                     className={`
//                       w-full text-left p-3 rounded-lg transition-all
//                       ${filters.sortBy === option.value ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' : 'hover:bg-gray-700/50'}
//                     `}
//                   >
//                     <div className="flex items-center justify-between">
//                       <span className={filters.sortBy === option.value ? "text-white font-medium" : "text-gray-300"}>
//                         {option.label}
//                       </span>
//                       {filters.sortBy === option.value && (
//                         <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
//                       )}
//                     </div>
//                   </button>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Apply Button */}
//       <motion.button
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//         onClick={applyFilters}
//         className="
//           w-full
//           py-3.5
//           mt-4
//           bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
//           text-white
//           font-semibold
//           rounded-xl
//           shadow-lg
//           shadow-indigo-500/25
//           hover:shadow-indigo-500/40
//           transition-all duration-300
//           flex items-center justify-center gap-2
//           group
//         "
//       >
//         <Filter size={18} />
//         Apply Filters
//         <motion.span
//           initial={{ x: -5, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           className="inline-block group-hover:translate-x-1 transition-transform"
//         >
//           →
//         </motion.span>
//       </motion.button>
//     </motion.div>
//   );
// }