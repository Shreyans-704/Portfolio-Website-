"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Trigger content reveal after a short delay to sync with shutter
    const timer = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Parallax constraints for Name
  const nameY = useTransform(scrollY, [0, 400], [0, -80]);
  const nameScale = useTransform(scrollY, [0, 400], [1, 1.05]);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden bg-[#0b0f14]">
      
      {/* Shutter Reveal Overlay */}
      <motion.div
        initial={{ translateY: "0%" }}
        animate={{ translateY: "-100%" }}
        transition={{ 
          duration: 1.2, 
          ease: [0.77, 0, 0.175, 1], // Custom cubic-bezier for premium feel
          delay: 0.2 
        }}
        className="fixed inset-0 z-[100] bg-[#0b0f14] pointer-events-none"
      />

      {/* Cinematic Background Layer (z-0) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep Blue Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#0d121d] to-[#0b0f14]" />
        
        {/* Subtle Orange Glow (Bottom) */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-orange-500/10 blur-[120px] rounded-[100%] mix-blend-screen opacity-40" />

        {/* Primary Radial Glows */}
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-blue-600/15 blur-[140px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/2 right-1/4 w-[50vw] h-[50vw] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />

        {/* Noise/Grain Texture */}
        <div className="noise-grain opacity-[0.08]" />

        {/* Floating Light Particles */}
        {mounted && Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40 blur-[1px]"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -150 - 50],
              opacity: [0, 0.4, 0],
              x: (Math.random() - 0.5) * 50 + (typeof window !== 'undefined' ? Math.random() * window.innerWidth : 500),
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
            style={{
              width: Math.random() * 8 + 4 + "px",
              height: Math.random() * 8 + 4 + "px",
              filter: "blur(2px)",
            }}
          />
        ))}
      </div>

      {/* Hero Content (z-20) */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-[1200px] text-center">
        
        {/* Glow Intensification behind text during reveal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showContent ? { opacity: 1, scale: 1.2 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute z-10 w-[40vw] h-[40vw] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"
        />

        {/* Main Heading Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mb-10 md:mb-16 w-full"
        >
          {/* Parallax Wrapper */}
          <motion.div style={{ y: nameY, scale: nameScale }} className="relative">
            <h1 className="relative z-20 text-[clamp(2.5rem,10vw,8.5rem)] font-bold tracking-tighter m-0 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-500 drop-shadow-[0_15px_30px_rgba(255,255,255,0.1)]">
              Shreyans Jaiswal
            </h1>

            {/* Reflection/Shadow Layer */}
            <h1
              className="absolute top-[3px] left-0 right-0 mx-auto text-center z-10 text-[clamp(2.5rem,10vw,8.5rem)] font-bold tracking-tighter m-0 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-blue-400/20 to-transparent blur-[12px] pointer-events-none"
              aria-hidden="true"
            >
              Shreyans Jaiswal
            </h1>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-xl md:text-3xl font-light text-gray-200 tracking-tight leading-relaxed max-w-3xl m-0 mb-6 px-4 md:px-0"
        >
          Full-Stack &amp; AI Developer building scalable, real-time, and AI-powered systems.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 0.65 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-[0.6rem] sm:text-xs md:text-sm font-medium text-gray-300 uppercase tracking-[0.1em] md:tracking-[0.2em] m-0 mb-10 text-balance px-4"
        >
          B.Tech IT @ NIT Jalandhar <span className="mx-2 opacity-30">|</span> Ex-Intern @ Engineers India Limited <span className="mx-2 opacity-30">|</span> Incoming Intern @ Conscendo Technologies
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="relative z-30"
        >
          <a
            href="/resume.pdf"
            download="Resume - shreyansjaiswal.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-row items-center justify-center gap-3 px-10 py-5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-white hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-700 ease-out"
          >
            <span className="text-sm md:text-base font-medium tracking-wide">Explore My Work</span>
            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>

    </section>
  );
}
