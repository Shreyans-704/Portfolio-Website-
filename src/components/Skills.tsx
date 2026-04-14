"use client";

import { motion } from "framer-motion";
import MarqueeStrip from "./MarqueeStrip";
import { CopySlash, Server, Code2, Cloud, Database } from "lucide-react";

export default function Skills() {
  const categories = [
    {
      title: "Frontend",
      icon: <CopySlash className="w-5 h-5" />,
      skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"]
    },
    {
      title: "Backend & Systems",
      icon: <Server className="w-5 h-5" />,
      skills: ["Node.js", "Express", "FastAPI", "WebSockets", "REST APIs"]
    },
    {
      title: "AI & Machine Learning",
      icon: <Code2 className="w-5 h-5" />,
      skills: ["RAG Architecture", "LangChain", "Gemini API", "Embeddings", "TensorFlow"]
    },
    {
      title: "DevOps & Cloud",
      icon: <Cloud className="w-5 h-5" />,
      skills: ["Docker", "CI/CD Pipelines", "AWS", "Google Cloud Platform"]
    },
    {
      title: "Databases",
      icon: <Database className="w-5 h-5" />,
      skills: ["MongoDB", "PostgreSQL", "Redis", "Vector DBs"]
    }
  ];

  return (
    <section id="skills" className="w-full relative border-t border-white/5">
      <MarqueeStrip words={["FULL-STACK", "AI ENGINEERING", "CLOUD NATIVE", "PERFORMANCE FIRST", "SYSTEM DESIGN", "ALWAYS SHIPPING", "DEVELOPER TOOLING"]} />
      <div className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-16">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            Core <span className="text-gray-500">Expertise</span>
          </h3>
          <p className="text-lg text-gray-400 font-light max-w-2xl leading-relaxed">
            The core architecture and tools I use to take applications from zero to global scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-md hover:bg-white/[0.04] transition-colors duration-300 h-full"
            >
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-2xl bg-[#0b0f14] flex items-center justify-center border border-white/10 group-hover:border-blue-500/30 group-hover:text-blue-400 text-gray-400 transition-colors duration-300 shadow-inner">
                  {category.icon}
                </div>
                <h4 className="text-lg font-bold tracking-tight text-white">{category.title}</h4>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {category.skills.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-default hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
