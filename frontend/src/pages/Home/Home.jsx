import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/collections/collections";

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
      <div className="mt-28" />

      {/* SECTION 3 — PRODUCT DISPLAY */}
      <section className="w-full">
        <FoodDisplay category={category} />
      </section>

      {/* SPACING */}
      <div className="mt-28" />


      {/* FINAL SPACE BEFORE FOOTER */}
      <div className="mb-20" />
    </div>
  );
};

export default Home;