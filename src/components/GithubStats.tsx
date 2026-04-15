"use client";

import { motion } from "framer-motion";
import MarqueeStrip from "./MarqueeStrip";

export default function GithubStats() {
  const stats = [
    {
      title: "GitHub Stats",
      url: "https://github-readme-stats.vercel.app/api?username=Shreyans-704&show_icons=true&theme=tokyonight&hide_border=true",
    },
    {
      title: "Contribution Streak",
      url: "https://streak-stats.demolab.com?user=Shreyans-704&theme=tokyonight&hide_border=true",
    },
    {
      title: "Top Languages",
      url: "https://github-readme-stats.vercel.app/api/top-langs/?username=Shreyans-704&layout=compact&theme=tokyonight&hide_border=true",
    },
  ];

  return (
    <section className="w-full relative border-t border-white/5 bg-[#0b0f14] min-h-screen overflow-hidden">
      <MarqueeStrip 
        words={["COMMIT", "PUSH", "STREAK", "OPEN SOURCE", "CONTRIBUTION", "CODE QUALITY", "GIT FLOW", "MERGE"]} 
      />
      
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="mb-16 text-center md:text-left">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white"
            >
              GitHub <span className="text-gray-500">Activity</span>
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-400 font-light max-w-xl leading-relaxed mx-auto md:mx-0"
            >
              Real-time contribution stats and coding activity fetched directly from my GitHub profile.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="group relative flex flex-col p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-md hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all duration-500 overflow-hidden"
              >
                <div className="mb-6">
                   <h4 className="text-sm font-bold tracking-widest text-white uppercase opacity-50 mb-4">
                     {stat.title}
                   </h4>
                   <div className="w-full h-px bg-white/5" />
                </div>
                
                <div className="flex items-center justify-center min-h-[150px]">
                  {/* Standard img tag as requested */}
                  <img 
                    src={stat.url} 
                    alt={stat.title} 
                    className="w-full h-auto rounded-lg select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>

                <div className="mt-6 flex items-center justify-between">
                   <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Real-time Data</span>
                   <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
