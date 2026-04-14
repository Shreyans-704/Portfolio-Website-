"use client";

import { motion } from "framer-motion";
import { Mail, Link, GitBranch, Download, Code2 } from "lucide-react";

export default function Contact() {
  return (
    <section className="w-full py-32 md:py-48 relative flex flex-col items-center justify-center text-center border-t border-white/5 overflow-hidden">
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.8 }}
         className="max-w-4xl px-6 w-full"
      >
        <h3 className="text-[clamp(1.75rem,8vw,4.5rem)] font-bold tracking-tighter mb-6 leading-[1.1] text-white drop-shadow-xl px-4 md:px-0">
          Let's build something impactful.
        </h3>
        <p className="text-lg md:text-xl text-gray-400 mb-16 font-light max-w-2xl mx-auto leading-relaxed">
          Open to internships, AI/Software roles, and high-impact collaborations.
        </p>
        
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full px-4">
          {/* Primary Action */}
          <a 
            href="mailto:shreyansj.it.23@nitj.ac.in" 
            className="flex items-center gap-3 px-8 py-4 min-h-[52px] rounded-full bg-white text-black hover:bg-gray-200 hover:scale-[1.03] transition-all duration-300 w-full sm:w-auto justify-center font-semibold tracking-wide"
          >
            <Mail className="w-5 h-5"/>
            Get in touch
          </a>

          {/* Secondary Actions */}
          <a 
            href="https://linkedin.com/in/Shreyans-Jaiswal" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 px-8 py-4 min-h-[52px] rounded-full bg-transparent border border-white/20 hover:bg-white/5 hover:border-white/40 hover:scale-[1.03] transition-all duration-300 font-medium w-full sm:w-auto justify-center text-white"
          >
            <Link className="w-4 h-4 text-gray-400"/>
            LinkedIn
          </a>

          <a 
            href="https://github.com/Shreyans-704" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 px-8 py-4 min-h-[52px] rounded-full bg-transparent border border-white/20 hover:bg-white/5 hover:border-white/40 hover:scale-[1.03] transition-all duration-300 font-medium w-full sm:w-auto justify-center text-white"
          >
            <GitBranch className="w-4 h-4 text-gray-400"/>
            GitHub
          </a>

          <a 
            href="https://leetcode.com/u/shreyans_704/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 px-8 py-4 min-h-[52px] rounded-full bg-transparent border border-white/20 hover:bg-white/5 hover:border-white/40 hover:scale-[1.03] transition-all duration-300 font-medium w-full sm:w-auto justify-center text-white"
          >
            <Code2 className="w-4 h-4 text-gray-400"/>
            LeetCode
          </a>

          {/* Download Resume Special */}
          <a 
            href="/resume.pdf" 
            download="Resume - shreyansjaiswal.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-3.5 min-h-[48px] rounded-full bg-transparent border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/50 hover:scale-[1.03] transition-all duration-300 font-medium w-full sm:w-auto justify-center sm:ml-4"
          >
            <Download className="w-4 h-4"/>
            Resume
          </a>
        </div>
      </motion.div>

      {/* Infinite Scrolling Marquee - Top */}
      <div className="absolute top-10 left-0 w-full overflow-hidden flex whitespace-nowrap opacity-[0.25] pointer-events-none z-10 mix-blend-screen">
        <motion.div
           className="flex gap-16 text-5xl md:text-8xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500"
           animate={{ x: [-1000, 0] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <span>I BUILD. I DESIGN. I SOLVE.</span>
          <span>ENGINEERING IDEAS INTO REALITY.</span>
          <span>I BUILD. I DESIGN. I SOLVE.</span>
          <span>ENGINEERING IDEAS INTO REALITY.</span>
        </motion.div>
      </div>

      {/* Infinite Scrolling Marquee - Bottom */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden flex whitespace-nowrap opacity-[0.25] pointer-events-none z-10 mix-blend-screen">
        <motion.div
          className="flex gap-16 text-5xl md:text-8xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <span>I BUILD. I DESIGN. I SOLVE.</span>
          <span>ENGINEERING IDEAS INTO REALITY.</span>
          <span>I BUILD. I DESIGN. I SOLVE.</span>
          <span>ENGINEERING IDEAS INTO REALITY.</span>
        </motion.div>
      </div>
    </section>
  );
}
