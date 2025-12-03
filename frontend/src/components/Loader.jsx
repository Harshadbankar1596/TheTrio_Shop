// import React from "react";
// import { motion } from "framer-motion";

// export default function loader() {
//   return (
//     <div className="w-full h-[70vh] flex items-center justify-center bg-black text-white">

//       {/* Outer Glow */}
//       <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] pointer-events-none" />

//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ 
//           opacity: 1, 
//           scale: 1,
//           transition: { duration: 0.8, ease: "easeOut" }
//         }}
//         className="
//           relative 
//           w-24 h-24 
//           rounded-2xl 
//           bg-white/5 
//           border border-white/10 
//           backdrop-blur-xl 
//           shadow-[0_0_35px_rgba(99,102,241,0.25)]
//           flex items-center justify-center
//           overflow-hidden
//         "
//       >
//         {/* Animated Shimmer Line */}
//         <motion.div
//           initial={{ rotate: 0 }}
//           animate={{ rotate: 360 }}
//           transition={{
//             repeat: Infinity,
//             duration: 1.4,
//             ease: "linear",
//           }}
//           className="absolute w-40 h-1 bg-indigo-400/70 rounded-full"
//         />

//         {/* Inner Pulse Circle */}
//         <motion.div
//           animate={{ scale: [1, 1.15, 1] }}
//           transition={{
//             repeat: Infinity,
//             duration: 1.2,
//             ease: "easeInOut",
//           }}
//           className="w-10 h-10 rounded-full bg-indigo-400/70 shadow-[0_0_25px_rgba(99,102,241,0.5)]"
//         />
//       </motion.div>
//     </div>
//   );
// }


import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">

        {/* T */}
        <svg viewBox="0 0 100 100" width="60" height="60">
          <path
            d="M10 20 H90 M50 20 V90"
            className="letter"
          />
        </svg>

        {/* h */}
        <svg viewBox="0 0 100 100" width="60" height="60">
          <path
            d="M20 20 V90 M20 55 Q50 20 80 55 V90"
            className="letter"
          />
        </svg>

        {/* e */}
        <svg viewBox="0 0 100 100" width="60" height="60">
          <path
            d="M80 60 Q50 85 20 60 Q50 35 80 60 M20 60 H80"
            className="letter"
          />
        </svg>

        {/* T */}
        <svg viewBox="0 0 100 100" width="60" height="60">
          <path
            d="M10 20 H90 M50 20 V90"
            className="letter"
          />
        </svg>

        {/* r */}
        <svg viewBox="0 0 100 100" width="60" height="60">
          <path
            d="M20 20 V90 M20 55 Q50 20 80 35"
            className="letter"
          />
        </svg>

        {/* i */}
        <svg viewBox="0 0 100 100" width="60" height="60">
          <path
            d="M50 20 V90 M50 10 L50 15"
            className="letter"
          />
        </svg>

        {/* o */}
        <svg viewBox="0 0 100 100" width="60" height="60">
          <path
            d="
              M50 20
              Q80 20 80 50
              Q80 80 50 80
              Q20 80 20 50
              Q20 20 50 20
            "
            className="letter"
          />
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  svg {
    overflow: visible;
  }

  .letter {
    fill: none;
    stroke: url(#gradient);
    stroke-width: 6;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
    animation: draw 2s ease-in-out infinite;
  }

  @keyframes draw {
    0% {
      stroke-dashoffset: 400;
    }
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: -400;
    }
  }
`;

export default Loader;
