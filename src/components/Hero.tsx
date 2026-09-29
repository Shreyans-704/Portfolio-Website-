"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax constraints for Name (used exclusively in Desktop Hero)
  // When scrolling down from 0 to 400px, move up by 80px and scale to 1.05
  const nameY = useTransform(scrollY, [0, 400], [0, -80]);
  const nameScale = useTransform(scrollY, [0, 400], [1, 1.05]);

  return (
    // hero-section-svh applies min-height: 100svh via globals.css as progressive enhancement
    <section className="hero-section-svh relative w-full min-h-screen flex flex-col overflow-hidden">

      {/* Background Soft Radial Glows & Particles (z-0) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/4 mix-blend-screen" />
        <div className="absolute w-[60vw] max-w-[600px] h-[60vw] max-h-[600px] bg-orange-500/10 blur-[150px] rounded-full -translate-x-1/4 mix-blend-screen" />

        {/* Abstract Glowing Particles (Desktop only for 60fps mobile touch performance) */}
        {mounted && (
          <div className="hidden md:contents">
            {Array.from({ length: 20 }).map((_, i) => (
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
        )}
      </div>

      {/* ============================================================
          DESKTOP HERO CONTAINER (LOCKED: >= md / 768px+)
          Exact visual & functional fidelity preserved:
          - Parallax constraints (nameY, nameScale)
          - Clamp display typography & metallic gradient
          - Depth illusion drop-shadow
          - Subtitle & inline pipe-separated credentials
         ============================================================ */}
      {/* Desktop: full-viewport centered block, unchanged */}
      <div className="relative z-20 hidden md:flex flex-col items-center justify-center w-full h-full min-h-screen max-w-[1200px] mx-auto px-6 text-center">

        {/* Main Heading Container with explicit margin to prevent collision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mb-6 md:mb-10 lg:mb-16 w-full"
        >
          {/* Parallax Wrapper */}
          <motion.div style={{ y: nameY, scale: nameScale }} className="relative">
            {/* Primary High-Fidelity 3D Texture Text */}
            <h1 className="relative z-20 text-[clamp(2.4rem,11vw,8rem)] font-bold tracking-tighter m-0 leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-600 drop-shadow-[0_15px_30px_rgba(255,255,255,0.1)]">
              Shreyans Jaiswal
            </h1>

            {/* Depth Illusion Layer (Shadow behind text) */}
            <span
              className="absolute top-[3px] left-0 right-0 mx-auto text-center z-10 text-[clamp(2.4rem,11vw,8rem)] font-bold tracking-tighter m-0 leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-blue-500/20 to-transparent blur-[8px] pointer-events-none"
              aria-hidden="true"
            >
              Shreyans Jaiswal
            </span>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-base sm:text-xl md:text-3xl font-light text-gray-200 tracking-tight leading-relaxed max-w-3xl m-0 mb-5 md:mb-6 px-2 md:px-0"
        >
          Building real-time systems, AI applications, and production-grade web platforms.
        </motion.h2>

        {/* Subtext — metadata row */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="m-0 mb-0 px-4 text-balance"
        >
          <span className="hidden sm:inline text-xs md:text-sm font-medium text-gray-300 uppercase tracking-[0.15em] md:tracking-[0.2em]">
            B.Tech IT @ NIT Jalandhar <span className="mx-2 opacity-30">|</span> Ex-Intern @ Engineers India Limited <span className="mx-2 opacity-30">|</span> Ex-Salesforce Intern @ Conscendo Technologies
          </span>
        </motion.p>

      </div>

      {/* ============================================================
          MOBILE HERO CONTAINER (< md / 320px – 767px)
          Left-aligned, top-anchored, full-viewport editorial layout.
          Uses deliberate vertical rhythm instead of justify-center.
         ============================================================ */}
      <div className="relative z-20 flex md:hidden flex-col items-start text-left w-full px-5 xs:px-6 pt-[100px] pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-full flex flex-col items-start"
        >
          {/* 1. Status / Role Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[0.72rem] xs:text-[0.78rem] font-medium text-gray-300 tracking-wide">
              Software Engineer &amp; AI Developer
            </span>
          </div>

          {/* 2. Terminal-Style Identity — 24px below badge */}
          <div className="mt-6 font-mono text-[0.78rem] xs:text-[0.85rem] text-gray-400 tracking-tight flex items-center gap-1.5 select-none">
            <span className="text-blue-400 font-semibold">&gt;</span>
            <span className="text-gray-300 font-medium">shreyans.me</span>
            <span className="text-gray-500">(</span>
            <span className="text-emerald-400/90">&quot;who are you?&quot;</span>
            <span className="text-gray-500">)</span>
          </div>

          {/* 3. Main Headline — 28px below terminal */}
          <h1 className="mt-7 text-[2.6rem] xs:text-[2.9rem] font-bold tracking-tight text-white leading-[1.05]">
            Shreyans Jaiswal
          </h1>

          {/* 4. Value Proposition — 14px below name */}
          <h2 className="mt-3.5 text-[1.2rem] xs:text-[1.3rem] font-normal text-gray-200 leading-snug tracking-tight max-w-[340px] xs:max-w-[380px]">
            I build backend systems, real-time applications, and AI-powered software.
          </h2>

          {/* 5. Compact Credentials — 48px below value prop */}
          <div className="mt-12 flex flex-col gap-1.5 font-medium">
            <div className="flex items-center gap-2 flex-wrap text-[0.82rem] xs:text-[0.875rem]">
              <span className="text-gray-300">B.Tech IT @ NIT Jalandhar</span>
              <span className="text-gray-600">·</span>
              <span className="text-blue-400/80 font-mono">2027</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-[0.82rem] xs:text-[0.875rem] text-gray-400">
              <span>Ex-Intern @ EIL</span>
              <span className="text-gray-600">·</span>
              <span>Ex-Salesforce Intern @ Conscendo</span>
            </div>
          </div>

          {/* 6. Description — 40px below credentials */}
          <p className="mt-10 text-[0.875rem] xs:text-[0.9rem] text-gray-400 leading-[1.7] max-w-[340px] xs:max-w-[370px] font-light">
           I build scalable software across backend systems, distributed applications, cloud automation, and AI — from real-time collaborative platforms and TCP-based systems to LLM-powered developer tools.
          </p>

          {/* 7. Dual Mobile CTA Action Bar — 44px below description */}
          <div className="mt-11 flex items-center gap-3 w-full flex-wrap xs:flex-nowrap">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm tracking-wide shadow-lg shadow-white/10 active:scale-95 transition-all w-full xs:w-auto cursor-pointer"
            >
              <span>See the work</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 font-medium text-sm tracking-wide active:scale-95 transition-all backdrop-blur-sm w-full xs:w-auto cursor-pointer"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
