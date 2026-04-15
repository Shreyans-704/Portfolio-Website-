"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax constraints for Name
  // When scrolling down from 0 to 400px, move up by 80px and scale to 1.05
  const nameY = useTransform(scrollY, [0, 400], [0, -80]);
  const nameScale = useTransform(scrollY, [0, 400], [1, 1.05]);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">

      {/* Background Soft Radial Glows & Particles (z-0) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/4 mix-blend-screen" />
        <div className="absolute w-[60vw] max-w-[600px] h-[60vw] max-h-[600px] bg-orange-500/10 blur-[150px] rounded-full -translate-x-1/4 mix-blend-screen" />

        {/* Abstract Glowing Particles */}
        {mounted && Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.1,
              scale: Math.random() * 2,
            }}
            animate={{
              y: [null, Math.random() * -200 - 100],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              boxShadow: "0 0 10px rgba(255,255,255,0.8)"
            }}
          />
        ))}
      </div>

      {/* Clean Hero Layout Container (z-20) */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-[1200px] text-center">

        {/* Main Heading Container with explicit margin to prevent collision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mb-10 md:mb-16 w-full"
        >
          {/* Parallax Wrapper */}
          <motion.div style={{ y: nameY, scale: nameScale }} className="relative">
            {/* Primary High-Fidelity 3D Texture Text */}
            <h1 className="relative z-20 text-[clamp(2.5rem,10vw,8rem)] font-bold tracking-tighter m-0 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-600 drop-shadow-[0_15px_30px_rgba(255,255,255,0.1)]">
              Shreyans Jaiswal
            </h1>

            {/* Depth Illusion Layer (Shadow behind text) */}
            <h1
              className="absolute top-[3px] left-0 right-0 mx-auto text-center z-10 text-[clamp(2.5rem,10vw,8rem)] font-bold tracking-tighter m-0 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-blue-500/20 to-transparent blur-[8px] pointer-events-none"
              aria-hidden="true"
            >
              Shreyans Jaiswal
            </h1>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-xl md:text-3xl font-light text-gray-200 tracking-tight leading-relaxed max-w-3xl m-0 mb-6 px-4 md:px-0"
        >
          Building real-time systems, AI applications, and production-grade web platforms.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[0.6rem] sm:text-xs md:text-sm font-medium text-gray-300 uppercase tracking-[0.1em] md:tracking-[0.2em] m-0 mb-10 text-balance px-4"
        >
          B.Tech IT @ NIT Jalandhar <span className="mx-2 opacity-30">|</span> Ex-Intern @ Engineers India Limited <span className="mx-2 opacity-30">|</span> Incoming Intern @ Conscendo Technologies
        </motion.p>

      </div>

    </section>
  );
}
