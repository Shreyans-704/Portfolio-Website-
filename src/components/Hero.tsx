"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();
  const [particles, setParticles] = useState<
    { x: number; y: number; opacity: number; scale: number; size: number; drift: number; duration: number }[]
  >([]);

  useEffect(() => {
    // Generate once on mount (client-only) to avoid SSR hydration mismatch
    // and re-render instability from Math.random() / window in render.
    const w = window.innerWidth;
    const h = window.innerHeight;
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        opacity: Math.random() * 0.5 + 0.1,
        scale: Math.random() * 2,
        size: Math.random() * 4 + 1,
        drift: Math.random() * -200 - 100,
        duration: Math.random() * 10 + 10,
      }))
    );
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
        {particles.length > 0 && (
          <div className="hidden md:contents" aria-hidden="true">
            {particles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                initial={{
                  x: p.x,
                  y: p.y,
                  opacity: p.opacity,
                  scale: p.scale,
                }}
                animate={{
                  y: [null, p.drift],
                  opacity: [null, 0],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  width: p.size + "px",
                  height: p.size + "px",
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
          Left-aligned, top-anchored editorial layout.
          Compact vertical rhythm tuned for phones; desktop
          container above is untouched (>= md).
         ============================================================ */}
      <div className="mobile-hero relative z-20 flex md:hidden flex-col items-start text-left w-full max-w-full overflow-x-clip px-5 xs:px-6 pt-[88px] pb-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative z-[1] w-full max-w-full flex flex-col items-start"
        >
          {/* 1. Status / Role Badge */}
          <div className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="truncate text-[0.72rem] xs:text-[0.78rem] font-medium text-gray-300 tracking-wide">
              Software Engineer &amp; AI Developer
            </span>
          </div>

          {/* 2. Main Headline — metallic gradient echoes desktop identity */}
          <h1 className="mobile-hero-name mt-6 max-w-full font-bold tracking-[-0.03em] leading-[1.02] text-balance text-[clamp(2.05rem,10.5vw,2.9rem)] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-400 drop-shadow-[0_2px_16px_rgba(255,255,255,0.07)]">
            Shreyans Jaiswal
          </h1>

          {/* 3. Compact Credentials panel */}
          <div className="mt-6 w-full max-w-full rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] px-4 pt-3 pb-3.5 flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
            <p className="pb-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.8rem] xs:text-[0.85rem] leading-relaxed font-medium">
              <span className="text-gray-100">B.Tech IT @ NIT Jalandhar</span>
              <span className="text-gray-600" aria-hidden="true">·</span>
              <span className="text-blue-400/90 font-mono text-[0.78em]">2027</span>
            </p>
            <p className="border-t border-white/[0.06] pt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.8rem] xs:text-[0.85rem] leading-relaxed text-gray-400">
              <span>Ex-Intern @ EIL</span>
              <span className="text-gray-600" aria-hidden="true">·</span>
              <span>Ex-Salesforce Intern @ Conscendo</span>
            </p>
          </div>

          {/* 4. Description */}
          <p className="mt-5 max-w-full text-[0.95rem] text-gray-400 leading-[1.7] font-light text-pretty">
           I build scalable software across backend systems, distributed applications, cloud automation, and AI — from <span className="text-gray-100 font-normal">real-time collaborative platforms</span> and TCP-based systems to <span className="text-gray-100 font-normal">AI-assisted developer tools</span>.
          </p>

          {/* 5. Stacked Mobile CTA Action Bar */}
          <div className="mobile-hero-cta mt-7 flex flex-col w-full max-w-full gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 min-h-[54px] py-4 rounded-xl bg-white text-black font-semibold text-[0.95rem] tracking-wide shadow-[0_8px_32px_rgba(255,255,255,0.10)] active:scale-[0.98] transition-transform w-full cursor-pointer"
            >
              <span>See the work</span>
              <ArrowDown className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 min-h-[54px] py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white hover:bg-white/10 font-medium text-[0.95rem] tracking-wide active:scale-[0.98] transition-all backdrop-blur-sm w-full cursor-pointer"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4 shrink-0 text-gray-400" aria-hidden="true" />
            </a>
          </div>

          {/* 6. Scroll cue — subtle affordance for the content below */}
          <div className="mobile-scroll-cue mt-10 flex w-full flex-col items-center gap-1.5" aria-hidden="true">
            <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-gray-600">
              Scroll to explore
            </span>
            <ChevronDown className="h-4 w-4 text-gray-600 animate-bounce" />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
