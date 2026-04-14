"use client";

import { motion } from "framer-motion";

const marqueeWords = ["TRUST", "COLLABORATION", "EXCELLENCE", "PRECISION", "INNOVATION", "INTEGRITY", "IMPACT", "VELOCITY"];

function MarqueeStrip({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords];

  return (
    <div className="w-full overflow-hidden flex whitespace-nowrap border-y border-white/10 bg-white/[0.02] py-3">
      <motion.div
        className="flex gap-8 shrink-0"
        animate={{ x: reverse ? [0, "-50%"] : ["-50%", 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {items.map((word, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-white/80">{word}</span>
            <span className="text-white/40 text-lg">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function WhyMe() {
  const points = [
    { title: "Production Proven", desc: "Built full-stack platforms successfully scaled to 500+ users natively." },
    { title: "AI-First Backends", desc: "Deep engineering focus on RAG, Vector databases, and LLM orchestration." },
    { title: "Real-Time Systems", desc: "Optimized pipelines resulting in guaranteed sub-50ms sync latencies." },
    { title: "Scalable DevOps", desc: "Maintains >70% test coverage backed by Dockerized CI/CD automated deployments." }
  ];

  return (
    <section className="w-full relative border-t border-white/5">

      {/* Top marquee — left to right */}
      <MarqueeStrip reverse={false} />

      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3 w-full sticky top-32"
          >
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-tight">
              Why <br /><span className="text-gray-500">Me?</span>
            </h3>
          </motion.div>

          <div className="lg:w-2/3 w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col"
              >
                <h4 className="text-xl font-bold tracking-tight mb-3 text-white">{p.title}</h4>
                <p className="text-base text-gray-400 leading-[1.6] font-light">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom marquee — right to left */}
      <MarqueeStrip reverse={true} />

    </section>
  );
}
