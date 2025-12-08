import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import NewProducts from "../../components/newproducts/NewProducts"
const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">

      {/* SECTION 1 — HERO */}
      <section className="w-full">
        <Header setCategory={setCategory} />
      </section>

      {/* SPACING BETWEEN SECTIONS */}
      <div className="mt-28" />

      {/* SECTION 2 — EXPLORE MENU */}
      <section className="w-full">
        <ExploreMenu category={category} setCategory={setCategory} />
      </section>

      {/* SPACING */}

      {/* SECTION 3 — PRODUCT DISPLAY */}
      <section className="w-full">
        <NewProducts />
      </section>

      
    </div>
  );
};

export default Home;