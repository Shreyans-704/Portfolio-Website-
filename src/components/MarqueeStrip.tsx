"use client";

import { motion } from "framer-motion";

interface MarqueeStripProps {
  words: string[];
  reverse?: boolean;
  speed?: number;
}

export default function MarqueeStrip({ words, reverse = false, speed = 25 }: MarqueeStripProps) {
  const items = [...words, ...words, ...words, ...words];

  return (
    <div className="w-full overflow-hidden flex whitespace-nowrap border-y border-white/[0.06] bg-white/[0.015] py-3">
      <motion.div
        className="flex gap-8 shrink-0"
        animate={{ x: reverse ? [0, "-50%"] : ["-50%", 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {items.map((word, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-white/70">
              {word}
            </span>
            <span className="text-white/30 text-base">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
