import React from "react";
import { motion } from "framer-motion";

const AppDownload = () => {
  return (
    <div
      id="app-download"
      className="w-full mt-32 px-6 md:px-16 flex flex-col items-center text-center text-white bg-black"
    >
      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-semibold leading-snug tracking-tight"
      >
        Experience TheTrio Like Never Before
        <br />
        <span className="text-indigo-400 font-bold drop-shadow-[0_0_10px_rgba(99,102,241,0.65)]">
          Download TheTrio App
        </span>
      </motion.p>

      {/* Store Buttons */}
      <div className="flex gap-8 mt-10">
        {/* Play Store */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          whileHover={{
            scale: 1.08,
            rotateX: 6,
            y: -4,
            boxShadow: "0px 15px 40px rgba(99,102,241,0.35)",
          }}
          className="w-40 h-14 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl cursor-pointer grid place-items-center transition-all"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Play Store"
            className="w-32 opacity-90"
          />
        </motion.div>

        {/* App Store */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          whileHover={{
            scale: 1.08,
            rotateX: 6,
            y: -4,
            boxShadow: "0px 15px 40px rgba(139,92,246,0.35)",
          }}
          className="w-40 h-14 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl cursor-pointer grid place-items-center transition-all"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/97/Download_on_the_App_Store_Badge.svg"
            alt="App Store"
            className="w-32 opacity-90"
          />
        </motion.div>
      </div>

      {/* Divider */}
      <motion.hr
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-20 w-full border-white/10"
      />
    </div>
  );
};

export default AppDownload;
