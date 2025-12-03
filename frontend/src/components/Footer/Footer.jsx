import React from "react";
import { motion } from "framer-motion";
import Name from "../Name"; // Your Brand Component (Keep it)

const Footer = () => {
  return (
    <div
      id="footer"
      className="w-full bg-black text-white pt-20 pb-10 px-6 md:px-16"
    >
      {/* Main Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-14"
      >
        {/* LEFT SECTION */}
        <div className="space-y-6">
          {/* Brand */}
          <div className="scale-105">
            <Name />
          </div>

          <p className="text-white/60 leading-relaxed max-w-sm">
            TheTrio brings minimal, modern and premium fashion collections
            crafted with timeless silhouettes and futuristic styles for the
            next-gen wardrobe.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 pt-2">
            <motion.div
              whileHover={{ scale: 1.15, rotate: 2 }}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer backdrop-blur-lg hover:border-indigo-400 transition-all"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384005.png"
                alt="facebook"
                className="w-6 opacity-80"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.15, rotate: -2 }}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer backdrop-blur-lg hover:border-indigo-400 transition-all"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="twitter"
                className="w-6 opacity-80"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.15 }}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer backdrop-blur-lg hover:border-indigo-400 transition-all"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="linkedin"
                className="w-6 opacity-80"
              />
            </motion.div>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="space-y-5">
          <h2 className="text-xl font-semibold tracking-wide text-white">
            Company
          </h2>

          <ul className="space-y-3 text-white/60">
            {["Home", "About Us", "Collections", "Privacy Policy"].map(
              (item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="cursor-pointer hover:text-white transition-all"
                >
                  {item}
                </motion.li>
              )
            )}
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-5">
          <h2 className="text-xl font-semibold tracking-wide text-white">
            Get in Touch
          </h2>

          <ul className="space-y-3 text-white/60">
            <motion.li
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              +91 7028445707
            </motion.li>

            <motion.li
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer hover:text-white transition-all"
            >
              optimizedd90@gmail.com
            </motion.li>
          </ul>
        </div>
      </motion.div>

      {/* Divider */}
      <motion.hr
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1.2 }}
        className="border-white/10 mt-16"
      />

      {/* Footer Bottom */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-white/50 mt-8 tracking-wide"
      >
        © {new Date().getFullYear()} TheTrio — All Rights Reserved.
      </motion.p>
    </div>
  );
};

export default Footer;
