import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useGetBannerBynameQuery } from "../../redux/Admin/userAPI";

function MagneticButton({ children, onClick, variant = "solid" }) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);

  function handleMove(e) {
    if (!wrapperRef.current || !innerRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    innerRef.current.style.transform = `translate(${x * 0.15}px, ${
      y * 0.15
    }px)`;
  }

  function handleLeave() {
    if (!innerRef.current) return;
    innerRef.current.style.transform = "translate(0px, 0px)";
  }

  const isGhost = variant === "ghost";

  return (
    <motion.button
      ref={wrapperRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
      className={`relative overflow-hidden inline-flex items-center px-7 py-3 rounded-full font-semibold tracking-wide select-none
        ${
          isGhost
            ? "bg-white/10 border border-white/20 text-white backdrop-blur-xl"
            : "bg-white text-black shadow-[0_10px_35px_rgba(255,255,255,0.25)]"
        }`}
    >
      <span
        ref={innerRef}
        className="relative z-20 flex items-center gap-2 transition-transform duration-150"
      >
        {children}
      </span>

      <span
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-400/90"
        style={{ boxShadow: "0 0 10px rgba(99,102,241,0.8)" }}
      />
    </motion.button>
  );
}

const Header = ({ setCategory = () => {} }) => {
  const ref = useRef(null);
  const { data : homepage} = useGetBannerBynameQuery("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

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
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.7)), url(${homepage?.data?.image})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* FLEX: LEFT TEXT + RIGHT 3D MODEL */}
      <div className="container mx-auto px-6 md:px-12 h-full flex items-center justify-between gap-8">
        {/* LEFT TEXT */}
        <motion.div
          className="relative max-w-2xl"
          animate={{
            x: mousePos.x * 15,
            y: mousePos.y * 15,
          }}
          transition={{ type: "spring", stiffness: 70, damping: 20 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: mousePos.y * 4,
              rotateY: mousePos.x * 4,
            }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold"
          >
            TheTrio — Crafted Minimal Fashion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{
              opacity: 1,
              y: 0,
              x: mousePos.x * 8,
              y: mousePos.y * 8,
            }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4 text-gray-200 max-w-xl"
          >
            Curated selection of premium Shirts, Pants, and T-Shirts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{
              opacity: 1,
              y: 0,
              x: mousePos.x * 5,
              y: mousePos.y * 5,
            }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 flex gap-4"
          >
            <MagneticButton onClick={() => setCategory("Shirts")}>
              Shop Shirts
            </MagneticButton>

            <MagneticButton
              variant="ghost"
              onClick={() => setCategory("Pants")}
            >
              Shop Pants
            </MagneticButton>
          </motion.div>
        </motion.div>
        <Hover3DWrapper>
          {/* <ShirtViewer /> */}
          <div className="w-full h-full flex justify-center object-contain">
            <img src="us.png" alt="" />
          </div>
        </Hover3DWrapper>
      </div>
    </section>
  );
};

export default Header;

const Hover3DWrapper = ({ children, intensity = 1 }) => {
  const ref = useRef(null);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();

    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    const rotateY = (x / rect.width) * intensity * 50;
    const rotateX = -(y / rect.height) * intensity * 50;

    ref.current.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
  }

  function handleMouseLeave() {
    ref.current.style.transform = `
      perspective(900px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-all flex justify-center items-center duration-300 ease-out w-full"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
};
