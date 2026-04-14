"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import MarqueeStrip from "./MarqueeStrip";

export default function About() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section id="about" ref={container} className="w-full relative border-t border-white/5 overflow-hidden">
      <MarqueeStrip words={["CURIOUS MIND", "CLEAN CODE", "PURPOSEFUL DESIGN", "SYSTEMS THINKER", "ALWAYS LEARNING", "HUMAN-CENTERED", "SCALABLE BY DEFAULT"]} />
      <div className="py-24 md:py-40 relative z-10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Text Side */}
          <div className="lg:w-1/2 basis-1/2 space-y-8 relative">
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              About Me
            </h3>
            
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-[1.8] tracking-normal">
              I’m an IT undergraduate at <span className="text-white font-medium">NIT Jalandhar</span>, focused on building scalable digital systems that combine performance, security, and clean design.
            </p>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-[1.8] tracking-normal">
              Currently, I’m gaining real-world experience through internships at <span className="text-white font-medium">Engineers India Limited (EIL)</span> and <span className="text-white font-medium">Conscendo Technologies</span> (a Salesforce Summit Partner), where I work on practical, enterprise-level solutions and modern development workflows.
            </p>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-[1.8] tracking-normal">
              My approach to engineering is simple — build systems that are fast, reliable, and actually useful. Whether it’s developing backend services, working with cloud platforms, or crafting responsive user interfaces, I focus on creating solutions that are both efficient and user-centric.
            </p>
            
            <div className="pt-6 border-t border-white/10 mt-8">
              <h4 className="text-white font-medium uppercase tracking-widest text-sm mb-4">Interests & Domains</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["AI", "Backend", "Real-Time", "Cloud & DevOps", "RAG & LLM", "Web Tech", "Performance"].map(interest => (
                  <span key={interest} className="px-3 sm:px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors cursor-default backdrop-blur-md">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image Side */}
          <div className="lg:w-1/2 basis-1/2 relative w-full max-w-[320px] md:max-w-[400px] lg:max-w-none mx-auto aspect-square flex justify-center items-center order-first lg:order-last">
            {/* Soft backdrop glow to match image */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
            
            <motion.div style={{ y: imgY }} className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(59,130,246,0.12)] bg-[#0a0a0c]">
              <Image 
                src="/profile.png" 
                alt="Shreyans Jaiswal" 
                fill 
                className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Subtle gradient overlay at the bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0c]/60 to-transparent" />
            </motion.div>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}
