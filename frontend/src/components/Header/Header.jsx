import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useGetBannerBynameQuery } from "../../redux/Admin/userAPI";
const Header = ({ setCategory = () => {} }) => {
  const ref = useRef(null);

  const {data  , isLoading} = useGetBannerBynameQuery("home")
  
  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const y = window.scrollY * 0.2;
      ref.current.style.backgroundPosition = `center calc(50% + ${y}px)`;
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[62vh] md:h-[75vh] text-white bg-black bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.7)), url(${data?.data?.image || "Home"})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 h-full flex items-center">
        <div className="relative max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            TheTrio — Crafted Minimal Fashion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
            className="mt-4 text-gray-200 max-w-xl leading-relaxed"
          >
            Curated selection of premium Shirts, Pants, and T-Shirts.
            Luxurious cuts, modern silhouettes, and clean futuristic design
            built for timeless elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="mt-8 flex gap-4"
          >
            <MagneticButton onClick={() => setCategory("Shirts")}>
              Shop Shirts
            </MagneticButton>

            <MagneticButton variant="ghost" onClick={() => setCategory("Pants")}>
              Shop Pants
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Header;


function MagneticButton({ children, onClick, variant = "solid" }) {
  const ref = useRef(null);

  // Move the inner layer slightly based on cursor position (magnetic feel)
  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // small translate for magnetic effect
    el.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
  }
  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate(0,0)`;
  }

  const isGhost = variant === "ghost";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      whileHover={{ scale: 1.04, rotateX: 3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={`relative inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-transform duration-300 select-none
        ${isGhost
          ? "bg-white/6 border border-white/10 text-white backdrop-blur-md"
          : "bg-white text-black shadow-[0_12px_40px_rgba(0,0,0,0.45)]"}
        `}
      style={{
        // subtle 3D shadow lift feel even before hover
        boxShadow: isGhost
          ? "0 6px 30px rgba(0,0,0,0.35)"
          : "0 14px 60px rgba(0,0,0,0.55)",
      }}
    >
      {/* Accent tiny gradient line for TheTrio feel */}
      <span
        className="absolute left-1 top-1 bottom-1 w-0.5 rounded"
        style={{
          background:
            "linear-gradient(180deg, rgba(99,102,241,0.95), rgba(139,92,246,0.95))",
          opacity: 0.95,
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}