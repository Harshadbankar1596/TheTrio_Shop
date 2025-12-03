// import React, { useState } from "react";
// import FilterSidebar from "./filtersidebar";
// import Products from "./products";

// export default function MainSection() {
//   const [filters, setFilters] = useState(null);

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">

//       {/* LEFT SIDE — FILTERS */}
//       <div className="lg:col-span-1">
//         <FilterSidebar onApply={(f) => setFilters(f)} />
//       </div>

//       {/* RIGHT SIDE — PRODUCTS */}
//       <div className="lg:col-span-5">
//         <Products appliedFilters={filters} />
//       </div>

//     </div>
//   );
// }


import React, { useState } from "react";
import FilterSidebar from "./filtersidebar";
import Products from "./products";
import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../../redux/Admin/userAPI";

export default function MainSection() {
    const { id } = useParams();

    const { data, isLoading } = useGetProductsByCategoryQuery(id);
    const products = data?.data || [];

    const [filters, setFilters] = useState(null);

    return (
        <div className="w-full flex flex-col lg:flex-row ">

            <div className="hidden lg:block w-[280px] mt-12">
                <FilterSidebar
                    products={products}
                    onApply={setFilters}
                />
            </div>

            <div className="flex-1">
                <Products
                    products={products}
                    appliedFilters={filters}
                    loading={isLoading}
                />
            </div>

        </div>
    );
}
