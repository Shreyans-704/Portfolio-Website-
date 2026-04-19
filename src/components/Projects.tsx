"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import MarqueeStrip from "./MarqueeStrip";

const projectsData = [
  {
  id: "live-code",
  title: "Live-CODE-X",
  category: "Real-Time WebApp",
  shortDesc: "Real-time collaborative IDE with ultra-low latency syncing.",
  
  problem: "Remote developers face delays and inefficiencies when collaborating using traditional IDEs and plugins.",
  
  solution: "Architected a WebSocket-based collaborative coding platform using Socket.IO with real-time synchronization and integrated Judge0 API for code execution.",
  
  tech: ["React", "Node.js", "Socket.IO", "Docker", "Jest"],
  
  metrics: "<50ms latency • 20+ concurrent users • 85% test coverage",
  
  githubUrl: "https://github.com/Shreyans-704/LIVE-CODE-X",
  liveUrl: "https://live-code-x.netlify.app/"
},

{
  id: "narrately",
  title: "Narrately AI",
  category: "AI SaaS Platform",
  shortDesc: "AI-powered video and script generation platform.",
  
  problem: "Content creators spend excessive time converting ideas into structured scripts and videos.",
  
  solution: "Built a full-stack AI SaaS platform using Gemini API with Redis-based async processing and AWS S3 storage for scalable content generation.",
  
  tech: ["React", "Node.js", "Gemini API", "Redis", "AWS S3"],
  
  metrics: "40% faster rendering • 100+ users • <3s latency",
  
  githubUrl: "https://github.com/Shreyans-704/Narrately-AI-",
  liveUrl: "https://www.narrately.in/"
},

{
  id: "docu-mind",
  title: "DocuMind",
  category: "RAG AI System",
  shortDesc: "Context-aware document Q&A using Retrieval-Augmented Generation.",
  
  problem: "Traditional search fails to answer semantic queries across large documents.",
  
  solution: "Developed a RAG pipeline using FastAPI and ChromaDB with hybrid retrieval (BM25 + embeddings) for accurate contextual responses.",
  
  tech: ["FastAPI", "LangChain", "ChromaDB", "Gemini API", "Next.js"],
  
  metrics: "Sub-2s response time • Handles 50+ documents efficiently",
  
  githubUrl: "https://github.com/Shreyans-704/DocuMind---RAG-based-Document-Q-A-Engine",
  liveUrl: "https://docu-mind-rag-based-document-q-a-engine-371nybwer.vercel.app/upload"
},

{
  id: "ai-security-scanner",
  title: "AI Security Scanner",
  category: "Full-Stack AI Security Tool",
  shortDesc: "AI-powered code vulnerability scanner with real-time detection and fixes.",
  
  problem: "Developers often miss common vulnerabilities like eval(), hardcoded secrets, and unsafe inputs due to lack of automated security checks.",
  
  solution: "Built an API-first security scanner using FastAPI with rule-based detection and Gemini-powered AI insights, integrated with a Next.js dashboard for real-time scanning and reporting.",
  
  tech: ["FastAPI", "Next.js", "TypeScript", "Tailwind CSS", "Gemini API"],
  
  metrics: "Detects 7+ vulnerability patterns • Real-time analysis • Deployed on Vercel + Render",
  
  githubUrl: "https://github.com/Shreyans-704/AI-Security-Scanner",
  liveUrl: "https://ai-security-scanner-taupe.vercel.app"
},

{
  id: "ai-wellness",
  title: "AI Wellness",
  category: "AI Health System",
  shortDesc: "Mental health screening tool with automated reporting.",
  
  problem: "Manual mental health assessments are time-consuming and lack scalability.",
  
  solution: "Developed a PHQ-9 based screening system with automated PDF report generation using AI-driven insights.",
  
  tech: ["React", "Supabase", "Gemini API"],
  
  metrics: "40% reduction in documentation time • 100+ users",
  
  githubUrl: "https://github.com/Shreyans-704/AI-Wellness-Health-Website",
  liveUrl: "https://wellnessaiweb.netlify.app/"
},

{
  id: "self-healing-infra",
  title: "Self-Healing Web App Infrastructure",
  category: "DevOps & Cloud System",
  shortDesc: "Resilient web infrastructure with auto-recovery and real-time monitoring.",

  problem: "Traditional systems require manual intervention when applications crash, leading to downtime and poor reliability.",

  solution: "Built a containerized system where applications automatically recover from failures using Docker restart policies, with real-time monitoring via Prometheus and Grafana for observability.",

  tech: ["Node.js", "Docker", "Docker Compose", "Prometheus", "Grafana"],

  metrics: "Auto-recovery within <10s • Real-time monitoring with 15s scrape interval • Zero manual intervention",

  githubUrl: "https://github.com/Shreyans-704/Self-Healing-Web-App-Infrastructure"
}

];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Allow Escape to close
  if (typeof window !== "undefined") {
    window.onkeydown = (e) => {
      if (e.key === "Escape") setSelectedId(null);
    };
  }

  return (
    <section className="w-full relative border-t border-white/5 bg-[#0b0f14] min-h-screen">
      <MarqueeStrip words={["SHIP IT", "BUILD IN PUBLIC", "PRODUCTION GRADE", "PROBLEM SOLVER", "CODE WITH PURPOSE", "REAL-WORLD IMPACT", "LAUNCH. ITERATE. GROW."]} />
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="mb-16">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
              Projects
            </h3>
            <p className="text-lg text-gray-400 font-light max-w-xl leading-relaxed">
              Production-grade systems ranging from real-time synchronization pipelines to complex RAG inference engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((p, i) => (
              <motion.div
                layoutId={`card-container-${p.id}`}
                onClick={() => setSelectedId(p.id)}
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer relative flex flex-col p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-md hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] hover:scale-[1.01] transition-all duration-500 overflow-hidden"
              >
                {/* Blue Arrow -> Live Deployment Project */}
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-0 right-0 p-8 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-20"
                  title="View Live Project"
                >
                  <div className="bg-blue-500/10 p-3 rounded-full border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                    <ArrowRight className="w-5 h-5 text-blue-400 -rotate-45" />
                  </div>
                </a>

                <motion.span layoutId={`category-${p.id}`} className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-4 block">
                  {p.category}
                </motion.span>
                <motion.h4 layoutId={`title-${p.id}`} className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4 leading-tight">
                  {p.title}
                </motion.h4>
                <motion.p layoutId={`shortDesc-${p.id}`} className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                  {p.shortDesc}
                </motion.p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {p.tech.slice(0, 3).map(t => (
                      <span key={t} className="px-3 py-1 bg-white/5 border border-white/5 rounded-md text-xs font-medium text-gray-400">
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 3 && <span className="px-3 py-1 text-xs text-gray-500 font-medium">+{p.tech.length - 3}</span>}
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Github Icon Button */}
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      title="View Source Code"
                    >
                      <FaGithub className="w-5 h-5" />
                    </a>
                    <span className="text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Project
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
              <motion.div
                layoutId={`card-container-${selectedId}`}
                className="w-full max-w-4xl bg-[#0e1219] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col pointer-events-auto max-h-[90vh] shadow-2xl"
              >
                <div className="p-8 md:p-12 overflow-y-auto no-scrollbar relative">

                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-30"
                    title="Close"
                    aria-label="Close project details"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {projectsData.map(p => p.id === selectedId && (
                    <div key={p.id} className="flex flex-col h-full">
                      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                        <motion.span layoutId={`category-${p.id}`} className="text-sm font-semibold tracking-widest uppercase text-blue-500 block">
                          {p.category}
                        </motion.span>
                        <div className="flex gap-4">
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium text-sm"
                          >
                            <FaGithub className="w-4 h-4" />
                            Source Code
                          </a>
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all font-medium text-sm shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Project
                          </a>
                        </div>
                      </div>

                      <motion.h4 layoutId={`title-${p.id}`} className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                        {p.title}
                      </motion.h4>
                      <motion.p layoutId={`shortDesc-${p.id}`} className="text-xl text-gray-300 font-light leading-relaxed mb-12">
                        {p.shortDesc}
                      </motion.p>

                      <div className="h-[1px] w-full bg-white/5 mb-12" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                        <div>
                          <h5 className="text-sm font-bold tracking-widest text-white uppercase mb-4 opacity-50">The Problem</h5>
                          <p className="text-gray-300 text-lg font-light leading-relaxed">{p.problem}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold tracking-widest text-white uppercase mb-4 opacity-50">The Solution</h5>
                          <p className="text-gray-300 text-lg font-light leading-relaxed">{p.solution}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                          <h5 className="text-sm font-bold tracking-widest text-white uppercase mb-4 opacity-50">Impact Metrics</h5>
                          <p className="text-xl text-white font-mono bg-white/5 border border-white/10 p-4 rounded-xl">{p.metrics}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold tracking-widest text-white uppercase mb-4 opacity-50">Tech Stack</h5>
                          <div className="flex flex-wrap gap-2">
                            {p.tech.map(t => (
                              <span key={t} className="px-4 py-2 border border-blue-500/30 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}


