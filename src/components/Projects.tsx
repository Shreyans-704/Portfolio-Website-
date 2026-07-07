"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Globe } from "lucide-react";
import { FaGithub, FaAws } from "react-icons/fa";
import { 
  SiTypescript, SiNodedotjs, SiExpress, SiPrisma, SiPostgresql, SiRedis, 
  SiDocker, SiJsonwebtokens, SiReact, SiTailwindcss, SiFramer, 
  SiPython, SiTensorflow, SiPytorch, SiOpencv, SiCplusplus, SiCmake, 
  SiScikitlearn, SiPandas, SiSocketdotio, SiJest, SiSupabase, SiGrafana, SiPrometheus
} from "react-icons/si";
import MarqueeStrip from "./MarqueeStrip";

const TechIcon = ({ name }: { name: string }) => {
  const iconMap: Record<string, JSX.Element> = {
    "TypeScript": <SiTypescript className="w-4 h-4 text-white" />,
    "Node.js": <SiNodedotjs className="w-4 h-4 text-[#339933]" />,
    "Express.js": <SiExpress className="w-4 h-4 text-white" />,
    "Prisma ORM": <SiPrisma className="w-4 h-4 text-white" />,
    "PostgreSQL": <SiPostgresql className="w-4 h-4 text-[#4169E1]" />,
    "Redis": <SiRedis className="w-4 h-4 text-[#DC382D]" />,
    "Docker": <SiDocker className="w-4 h-4 text-[#2496ED]" />,
    "JWT": <SiJsonwebtokens className="w-4 h-4 text-white" />,
    "React.js": <SiReact className="w-4 h-4 text-[#61DAFB]" />,
    "React": <SiReact className="w-4 h-4 text-[#61DAFB]" />,
    "Tailwind CSS": <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" />,
    "Framer Motion": <SiFramer className="w-4 h-4 text-white" />,
    "AWS": <FaAws className="w-4 h-4 text-[#FF9900]" />,
    "Python": <SiPython className="w-4 h-4 text-[#3776AB]" />,
    "TensorFlow": <SiTensorflow className="w-4 h-4 text-[#FF6F00]" />,
    "PyTorch": <SiPytorch className="w-4 h-4 text-[#EE4C2C]" />,
    "OpenCV": <SiOpencv className="w-4 h-4 text-white" />,
    "C++": <SiCplusplus className="w-4 h-4 text-[#00599C]" />,
    "CMake": <SiCmake className="w-4 h-4 text-[#064F8C]" />,
    "Scikit-learn": <SiScikitlearn className="w-4 h-4 text-[#F7931E]" />,
    "Pandas": <SiPandas className="w-4 h-4 text-white" />,
    "Socket.IO": <SiSocketdotio className="w-4 h-4 text-white" />,
    "Jest": <SiJest className="w-4 h-4 text-[#C21325]" />,
    "Supabase": <SiSupabase className="w-4 h-4 text-[#3ECF8E]" />,
    "Grafana": <SiGrafana className="w-4 h-4 text-[#F46800]" />,
    "Prometheus": <SiPrometheus className="w-4 h-4 text-[#E6522C]" />,
  };
  
  return iconMap[name] || <div className="w-4 h-4 rounded-full bg-gray-700" />;
};

const projectsData = [
  {
    id: "live-code",
    title: "Live-CODE-X",
    category: "Real-Time WebApp",
    tagline: "Collaborate seamlessly with ultra-low latency",
    status: "FEATURED",
    shortDesc: "Real-time collaborative IDE with ultra-low latency syncing.",
    overview: "Architected a WebSocket-based collaborative coding platform using Socket.IO with real-time synchronization and integrated Judge0 API for reliable remote code execution. Designed for remote developers who face delays and inefficiencies when collaborating using traditional IDEs and plugins, this platform enables seamless, real-time code editing and execution in a sandboxed environment.",
    problem: "Remote developers face delays and inefficiencies when collaborating using traditional IDEs and plugins.",
    solution: "Architected a WebSocket-based collaborative coding platform using Socket.IO with real-time synchronization and integrated Judge0 API for reliable remote code execution.",
    architecture: "React frontend communicating with a Node.js/Socket.IO backend, containerized with Docker, utilizing Judge0 for remote code execution.",
    challenges: "Handling concurrent edits without race conditions and minimizing WebSocket latency across different regions.",
    features: [
      "Real-time collaborative code editing",
      "Integrated Judge0 execution environment",
      "Ultra-low latency WebSocket syncing",
      "Multi-cursor support and conflict resolution",
      "Dockerized backend for consistent deployments",
      "Secure user authentication and role management"
    ],
    tech: ["TypeScript", "React", "Node.js", "Express.js", "Socket.IO", "Docker", "Jest"],
    metricsList: [
      { value: "<50ms", label: "Latency", icon: "⚡" },
      { value: "20+", label: "Concurrent Users", icon: "👥" },
      { value: "85%", label: "Test Coverage", icon: "✅" }
    ],
    githubUrl: "https://github.com/Shreyans-704/LIVE-CODE-X",
    liveUrl: "https://live-code-x.netlify.app/",
    image: "/projects/live-codex.png"
  },
  {
    id: "narrately",
    title: "Narrately AI",
    category: "AI SaaS Platform",
    tagline: "Transform ideas into videos instantly",
    status: "AI PROJECT",
    shortDesc: "AI-powered video and script generation platform.",
    overview: "Built a full-stack AI SaaS platform using Gemini API with Redis-based async processing and AWS S3 storage for scalable content generation. Content creators spend excessive time converting ideas into structured scripts and rendering corresponding videos, bottlenecking their content pipeline. Narrately AI automates this entirely, significantly speeding up production.",
    problem: "Content creators spend excessive time converting ideas into structured scripts and rendering corresponding videos.",
    solution: "Built a full-stack AI SaaS platform using Gemini API with Redis-based async processing and AWS S3 storage for scalable content generation.",
    architecture: "Next.js frontend with a Node.js backend leveraging the Gemini API. Redis handles job queues for video rendering, with final assets stored in AWS S3.",
    challenges: "Managing long-running video rendering tasks without timing out HTTP requests required robust background worker architecture.",
    features: [
      "Automated script to video generation",
      "Redis-based async render processing",
      "Scalable AWS S3 cloud storage",
      "Gemini API prompt engineering",
      "Secure user dashboard",
      "Instant video playback"
    ],
    tech: ["TypeScript", "React", "Node.js", "Express.js", "Gemini API", "Redis", "AWS"],
    metricsList: [
      { value: "40%", label: "Faster Rendering", icon: "🚀" },
      { value: "100+", label: "Active Users", icon: "👥" },
      { value: "<3s", label: "Latency", icon: "⚡" }
    ],
    githubUrl: "https://github.com/Shreyans-704/Narrately-AI-",
    liveUrl: "https://www.narrately.in/",
    image: "/projects/narrately.png"
  },
  {
    id: "docu-mind",
    title: "DocuMind",
    category: "RAG AI System",
    tagline: "Chat with your documents semantically",
    status: "PRODUCTION",
    shortDesc: "Context-aware document Q&A using Retrieval-Augmented Generation.",
    overview: "Developed a RAG pipeline using FastAPI and ChromaDB with hybrid retrieval (BM25 + embeddings) for highly accurate, context-aware responses. Traditional keyword search fails to answer complex semantic queries across large documents, leaving users manually skimming through hundreds of pages. DocuMind changes the paradigm by understanding context natively.",
    problem: "Traditional keyword search fails to answer complex semantic queries across large documents.",
    solution: "Developed a RAG pipeline using FastAPI and ChromaDB with hybrid retrieval (BM25 + embeddings) for highly accurate, context-aware responses.",
    architecture: "FastAPI orchestrates the LangChain RAG pipeline. Documents are chunked and embedded into ChromaDB, which is queried by the Gemini API.",
    challenges: "Balancing chunk size and overlap to ensure maximum context retention without exceeding the LLM context window limits.",
    features: [
      "Hybrid retrieval (BM25 + Vector)",
      "Context-aware semantic Q&A",
      "ChromaDB vector store integration",
      "LangChain orchestration",
      "PDF and Docx parsing",
      "Instant citations mapping"
    ],
    tech: ["FastAPI", "Python", "LangChain", "ChromaDB", "Gemini API", "React", "Tailwind CSS"],
    metricsList: [
      { value: "<2s", label: "Response Time", icon: "⚡" },
      { value: "50+", label: "Documents", icon: "📄" },
      { value: "99%", label: "Accuracy", icon: "🎯" }
    ],
    githubUrl: "https://github.com/Shreyans-704/DocuMind---RAG-based-Document-Q-A-Engine",
    liveUrl: "https://docu-mind-rag-based-document-q-a-engine-371nybwer.vercel.app/upload",
    image: "/projects/documind.png?v=1"
  },
  {
    id: "ai-security-scanner",
    title: "AI Security Scanner",
    category: "Full-Stack AI Security Tool",
    tagline: "Find vulnerabilities before they ship",
    status: "OPEN SOURCE",
    shortDesc: "AI-powered code vulnerability scanner with real-time detection and fixes.",
    overview: "Built an API-first security scanner using FastAPI with rule-based detection and Gemini-powered AI insights, integrated with a Next.js dashboard for real-time reporting. Developers often miss common vulnerabilities like eval(), hardcoded secrets, and unsafe inputs. This tool provides an automated, AI-assisted layer of defense.",
    problem: "Developers often miss common vulnerabilities like eval(), hardcoded secrets, and unsafe inputs.",
    solution: "Built an API-first security scanner using FastAPI with rule-based detection and Gemini-powered AI insights.",
    architecture: "Next.js dashboard interfaces with a FastAPI Python backend running static analysis and forwarding snippets to Gemini API.",
    challenges: "Reducing false positives by combining deterministic AST parsing with probabilistic LLM evaluation.",
    features: [
      "Real-time vulnerability detection",
      "AI-suggested code remediation",
      "API-first architecture",
      "Rule-based static analysis",
      "Modern Next.js dashboard",
      "CI/CD integration ready"
    ],
    tech: ["TypeScript", "Next.js", "FastAPI", "Python", "Tailwind CSS", "Gemini API"],
    metricsList: [
      { value: "7+", label: "Vuln Patterns", icon: "🛡️" },
      { value: "100%", label: "Real-time", icon: "⚡" },
      { value: "2", label: "Deployments", icon: "🚀" }
    ],
    githubUrl: "https://github.com/Shreyans-704/AI-Security-Scanner",
    liveUrl: "https://ai-security-scanner-blond.vercel.app/",
    image: "/projects/ai-security-scanner.png"
  },
  {
    id: "ai-wellness",
    title: "AI Wellness",
    category: "AI Health System",
    tagline: "Automated mental health screening & insights",
    status: "LIVE",
    shortDesc: "Mental health screening tool with automated reporting.",
    overview: "Developed a PHQ-9 based screening system with automated PDF report generation using AI-driven insights. Manual mental health assessments are time-consuming and lack scalability, making initial screening inaccessible for many individuals. This tool democratizes the process while keeping it private and secure.",
    problem: "Manual mental health assessments are time-consuming and lack scalability.",
    solution: "Developed a PHQ-9 based screening system with automated PDF report generation using AI-driven insights.",
    architecture: "React frontend captures data stored in Supabase. A serverless function triggers the Gemini API to analyze results and generate a PDF report.",
    challenges: "Ensuring sensitive assessment data is handled securely and AI insights remain strictly informative.",
    features: [
      "Automated PHQ-9 assessments",
      "AI-driven insight generation",
      "Automated PDF reporting",
      "Secure data storage",
      "Interactive health dashboard",
      "Responsive mobile design"
    ],
    tech: ["TypeScript", "React", "Supabase", "Gemini API", "Tailwind CSS"],
    metricsList: [
      { value: "40%", label: "Less Doc Time", icon: "📉" },
      { value: "100+", label: "Users", icon: "👥" },
      { value: "100%", label: "Private", icon: "🔒" }
    ],
    githubUrl: "https://github.com/Shreyans-704/AI-Wellness-Health-Website",
    liveUrl: "https://wellnessaiweb.netlify.app/",
    image: "/projects/ai-wellness.png"
  },
  {
    id: "self-healing-infra",
    title: "Self-Healing Infra",
    category: "DevOps & Cloud System",
    tagline: "Resilient systems that fix themselves",
    status: "PRODUCTION",
    shortDesc: "Resilient web infrastructure with auto-recovery and real-time monitoring.",
    overview: "Built a containerized system where applications automatically recover from failures using Docker restart policies, with real-time monitoring via Prometheus and Grafana. Traditional systems require manual intervention when applications crash, leading to unacceptable downtime. This infra ensures high availability.",
    problem: "Traditional systems require manual intervention when applications crash, leading to unacceptable downtime.",
    solution: "Built a containerized system where applications automatically recover from failures using Docker restart policies.",
    architecture: "Node.js apps running inside Docker containers managed by Docker Compose. Prometheus scrapes metrics, visualized in Grafana.",
    challenges: "Configuring optimal scrape intervals to prevent the monitoring stack from consuming excessive host resources.",
    features: [
      "Automated container recovery",
      "Real-time Grafana dashboards",
      "Prometheus metrics integration",
      "Docker Compose orchestration",
      "Zero manual intervention",
      "Alerting pipeline"
    ],
    tech: ["Node.js", "Docker", "Prometheus", "Grafana"],
    metricsList: [
      { value: "<10s", label: "Auto-recovery", icon: "⏱️" },
      { value: "15s", label: "Scrape Interval", icon: "📡" },
      { value: "100%", label: "Uptime Goal", icon: "📈" }
    ],
    githubUrl: "https://github.com/Shreyans-704/Self-Healing-Web-App-Infrastructure",
    liveUrl: "",
    image: "/projects/self-healing-infra.png?v=1"
  },
  {
    id: "neuroscan-ai",
    title: "NeuroScan-AI",
    category: "ML Project",
    tagline: "Intelligent medical pattern detection",
    status: "COMPLETED",
    shortDesc: "AI-based medical imaging tool for intelligent pattern detection and diagnosis support.",
    overview: "Built an AI-powered medical imaging analysis tool using deep learning models in TensorFlow/PyTorch and OpenCV to detect patterns and assist clinicians. Early diagnosis of medical conditions from imaging data is time-intensive and prone to human error without intelligent assistance tools.",
    problem: "Early diagnosis of medical conditions from imaging data is time-intensive and prone to human error.",
    solution: "Built an AI-powered medical imaging analysis tool using deep learning models to detect patterns and assist clinicians.",
    architecture: "Python-based processing pipeline using OpenCV for image normalization, fed into a PyTorch/TensorFlow CNN for classification.",
    challenges: "Mitigating class imbalance in medical datasets required advanced data augmentation.",
    features: [
      "Deep learning inference pipeline",
      "Automated pattern detection",
      "High-resolution image processing",
      "OpenCV data normalization",
      "Model accuracy validation",
      "Clinical support dashboard"
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "OpenCV"],
    metricsList: [
      { value: "95%", label: "Accuracy", icon: "🎯" },
      { value: "1000+", label: "Images Scanned", icon: "🖼️" },
      { value: "AI", label: "Assisted", icon: "🤖" }
    ],
    githubUrl: "https://github.com/Shreyans-704/NeuroScan-AI",
    liveUrl: "",
    image: "/projects/neuroscan-ai.png"
  },
  {
    id: "alzheimer-detection",
    title: "Alzheimer Detection",
    category: "ML Project",
    tagline: "Early detection through deep learning",
    status: "COMPLETED",
    shortDesc: "ML model for Alzheimer's detection using MRI & PET scan imaging.",
    overview: "Developed a deep learning pipeline to classify Alzheimer's stages from MRI images and PET scan data with high diagnostic accuracy. Early detection is critical yet challenging, subject to diagnostic variability. This tool normalizes that variability using a custom CNN architecture.",
    problem: "Early detection of Alzheimer's disease is critical yet challenging, subject to diagnostic variability.",
    solution: "Developed a deep learning pipeline to classify Alzheimer's stages from MRI images and PET scan data with high diagnostic accuracy.",
    architecture: "A custom Convolutional Neural Network (CNN) architecture optimized for 3D medical imaging, utilizing transfer learning.",
    challenges: "Aligning and preprocessing dual-modality scans to ensure spatial consistency.",
    features: [
      "Multi-stage Alzheimer's classification",
      "Dual modality (MRI & PET) processing",
      "Automated diagnostic pipeline",
      "Transfer learning implementation",
      "Spatial consistency alignment",
      "Performance evaluation matrix"
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "OpenCV"],
    metricsList: [
      { value: "Multi", label: "Stage Detection", icon: "🔍" },
      { value: "Dual", label: "Modality", icon: "🧠" },
      { value: "High", label: "Accuracy", icon: "⭐" }
    ],
    githubUrl: "https://github.com/Shreyans-704/Alzheimer-Detection-Using-DL-Models-on-MRI-Images-with-PET-Scans",
    liveUrl: "",
    image: "/projects/alzheimer-detection.png?v=1"
  },
  {
    id: "decentralized-lan",
    title: "LAN File Share",
    category: "Networking Project",
    tagline: "Peer-to-peer fast local transfers",
    status: "COMPLETED",
    shortDesc: "A peer-to-peer LAN file sharing application with automatic device discovery.",
    overview: "Designed and developed a decentralized LAN file sharing system that enables devices on the same local network to automatically discover each other using UDP broadcasts and exchange files directly over TCP. It solves the latency and privacy concerns of cloud transfers.",
    problem: "Most file sharing platforms rely on cloud servers, introducing latency and privacy concerns for local transfers.",
    solution: "Designed a decentralized LAN file sharing system that enables devices to automatically discover each other and exchange files.",
    architecture: "C++ application leveraging Winsock. A background thread listens for UDP broadcasts, while TCP sockets handle reliable transmission.",
    challenges: "Handling network partitions and ensuring reliable file transfer resumes in case of dropped TCP connections.",
    features: [
      "Automatic UDP peer discovery",
      "Direct high-speed TCP transfers",
      "100% serverless architecture",
      "Winsock implementation",
      "Cross-platform CMake build",
      "Background listener threads"
    ],
    tech: ["C++", "CMake"],
    metricsList: [
      { value: "100%", label: "Serverless", icon: "🌐" },
      { value: "Auto", label: "Discovery", icon: "📡" },
      { value: "Max", label: "LAN Speed", icon: "🚀" }
    ],
    githubUrl: "https://github.com/Shreyans-704/Decentralized-LAN-File-Sharing",
    liveUrl: "",
    image: "/projects/lan-file-sharing.png"
  },
  {
    id: "dna-pathogen",
    title: "DNA Pathogen AI",
    category: "AI / Bioinformatics",
    tagline: "Genomic sequence classification",
    status: "RESEARCH",
    shortDesc: "AI-powered pathogen prediction system analyzing DNA sequences.",
    overview: "Developed an AI-driven bioinformatics pipeline that processes DNA sequence data, extracts genomic features, and leverages machine learning models to classify and predict potential pathogens. Accurately identifying pathogens from DNA sequences is computationally intensive, and this pipeline automates it.",
    problem: "Accurate identification of pathogens from DNA sequences is essential but traditional methods are computationally intensive.",
    solution: "Developed a bioinformatics pipeline that processes DNA sequences and leverages ML models to classify potential pathogens.",
    architecture: "Python pipeline utilizing Pandas/NumPy for sequence tokenization, fed into Scikit-learn classifiers.",
    challenges: "Optimizing the k-mer extraction process to run efficiently on large DNA sequences.",
    features: [
      "Genomic feature extraction",
      "AI-based pathogen classification",
      "Automated sequence analysis",
      "k-mer extraction algorithm",
      "Scikit-learn classification",
      "Optimized memory usage"
    ],
    tech: ["Python", "Scikit-learn", "Pandas"],
    metricsList: [
      { value: "Auto", label: "Analysis", icon: "⚙️" },
      { value: "Fast", label: "k-mer Extraction", icon: "🧬" },
      { value: "High", label: "Prediction rate", icon: "📊" }
    ],
    githubUrl: "https://github.com/Shreyans-704/DNA-Pathogen-Pattern-Detection",
    liveUrl: "https://github.com/Shreyans-704/DNA-Pathogen-Pattern-Detection",
    image: "/projects/dna-pathogen.png"
  }
];

const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 1
};

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="w-full relative border-t border-white/5 bg-[#0B0F14] min-h-screen">
      <MarqueeStrip words={["SHIP IT", "BUILD IN PUBLIC", "PRODUCTION GRADE", "PROBLEM SOLVER", "CODE WITH PURPOSE", "REAL-WORLD IMPACT", "LAUNCH. ITERATE. GROW."]} />
      
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="mb-20">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
              Projects
            </h3>
            <p className="text-lg text-gray-400 font-light max-w-xl leading-relaxed">
              Production-grade systems ranging from real-time synchronization pipelines to complex RAG inference engines.
            </p>
          </div>

          <div className="flex flex-col gap-10 lg:gap-12">
            {projectsData.map((p) => (
              <motion.div
                layoutId={`card-${p.id}`}
                onClick={() => setSelectedId(p.id)}
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full flex flex-col lg:flex-row gap-0 rounded-[2rem] bg-[#0B0F14] border border-white/[0.08] shadow-[0_4px_40px_rgba(0,0,0,0.4)] overflow-hidden cursor-pointer group hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(59,130,246,0.1)]"
              >
                {/* LEFT COLUMN (45%) */}
                <div className="lg:w-[45%] relative p-6 lg:p-8 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-gray-900/40 to-[#0B0F14] min-h-[200px] lg:min-h-[250px]">
                  <div className="absolute top-6 right-6 z-20">
                    <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">{p.status}</span>
                  </div>
                  
                  <div className="relative w-full mt-6 mb-8 lg:mt-8 lg:mb-10 z-10 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                     <motion.img layoutId={`image-${p.id}`} src={p.image} alt={p.title} className="w-full h-auto object-contain max-w-[85%]" />
                  </div>

                  <div className="relative z-20 mt-auto">
                     <motion.h4 layoutId={`tagline-${p.id}`} className="text-lg md:text-xl font-medium text-white/90 leading-tight">
                       {p.tagline}
                     </motion.h4>
                  </div>

                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" />
                </div>

                {/* RIGHT COLUMN (55%) */}
                <div className="lg:w-[55%] p-6 lg:p-8 flex flex-col border-t lg:border-t-0 lg:border-l border-white/[0.05]">
                  <motion.h3 layoutId={`title-${p.id}`} className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {p.title}
                  </motion.h3>
                  <motion.p layoutId={`desc-${p.id}`} className="text-gray-400 text-base leading-relaxed mb-6">
                    {p.shortDesc}
                  </motion.p>

                  <div className="mb-6 flex-1">
                    <ul className="space-y-2">
                      {p.features.slice(0, 5).map((feature, idx) => (
                         <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm md:text-base">
                           <span className="text-gray-500 mt-1 shrink-0 text-[10px]">●</span>
                           <span className="leading-relaxed">{feature}</span>
                         </li>
                      ))}
                      {p.features.length > 5 && (
                         <li className="flex items-start gap-2 text-gray-500 text-xs md:text-sm mt-3">
                           <span className="mt-1 shrink-0 text-[10px] invisible">●</span>
                           <span>+{p.features.length - 5} more features</span>
                         </li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6 relative items-center">
                    {p.tech.slice(0, 6).map(tech => (
                       <div key={tech} className="px-4 py-2 rounded-full border border-white/10 bg-[#121820] flex items-center gap-2 text-xs font-medium text-gray-300 group-hover:bg-white/[0.05] group-hover:border-white/20 transition-colors">
                          <TechIcon name={tech} />
                          <span>{tech}</span>
                       </div>
                    ))}
                    {p.tech.length > 6 && (
                       <div className="px-4 py-2 rounded-full border border-white/10 bg-[#121820] flex items-center justify-center text-xs font-medium text-gray-500 group-hover:bg-white/[0.05] group-hover:border-white/20 transition-colors">
                          +{p.tech.length - 6}
                       </div>
                    )}

                    <div className="absolute right-0 bottom-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all bg-[#121820] z-20">
                       <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Case Study (Modal) */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-sm text-white"
          >
             {projectsData.map(p => p.id === selectedId && (
               <motion.div 
                 key={p.id} 
                 layoutId={`card-${p.id}`} 
                 transition={springTransition} 
                 onClick={(e) => e.stopPropagation()}
                 className="bg-[#0B0F14] border border-white/10 shadow-2xl relative w-full max-w-5xl rounded-[2rem] flex flex-col max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
               >
                  
                  {/* Close Button */}
                  <div className="sticky top-4 z-50 flex justify-end px-4 md:px-6 pt-4 -mb-14 pointer-events-none">
                     <button onClick={() => setSelectedId(null)} className="w-10 h-10 rounded-full bg-black/80 hover:bg-white/20 flex items-center justify-center backdrop-blur-xl transition-colors border border-white/10 text-gray-400 hover:text-white pointer-events-auto">
                       <X className="w-5 h-5" />
                     </button>
                  </div>

                  {/* Hero Banner */}
                  <div className="w-full flex flex-col items-center pt-16 pb-12 px-6 lg:px-8 relative border-b border-white/10 bg-gradient-to-b from-gray-900/40 to-[#0B0F14]">
                     <div className="absolute top-6 left-6 z-20 hidden md:block">
                        <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">{p.status}</span>
                     </div>
                     
                     <div className="relative w-full mt-8 mb-8 z-10 flex items-center justify-center">
                        <motion.img layoutId={`image-${p.id}`} src={p.image} alt={p.title} className="w-full h-auto object-contain drop-shadow-2xl max-w-[90%] md:max-w-[80%]" />
                     </div>
                     
                     <motion.h1 layoutId={`title-${p.id}`} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-center mb-4">
                       {p.title}
                     </motion.h1>
                     <motion.h4 layoutId={`tagline-${p.id}`} className="text-lg md:text-xl font-light text-gray-400 text-center max-w-2xl">
                       {p.tagline}
                     </motion.h4>
                  </div>

                  {/* Content Body */}
                  <div className="w-full max-w-5xl mx-auto px-6 lg:px-8 py-12 flex flex-col gap-12">
                     
                     {/* Tech Stack Pills (All) */}
                     <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                       {p.tech.map(tech => (
                         <div key={tech} className="px-4 py-2 rounded-full border border-white/10 bg-[#121820] flex items-center gap-2 text-xs md:text-sm text-gray-300">
                            <TechIcon name={tech} />
                            <span className="font-medium tracking-wide">{tech}</span>
                         </div>
                       ))}
                     </div>

                     {/* Overview */}
                     <div className="prose prose-invert max-w-none text-center md:text-left">
                       <p className="text-lg md:text-xl leading-relaxed font-light text-gray-300">
                         {p.overview}
                       </p>
                     </div>

                     {/* Detail Grid */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 border-t border-white/10 pt-12">
                        {/* Left Column */}
                        <div className="flex flex-col gap-10">
                           <section>
                             <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Problem</h3>
                             <p className="text-gray-300 text-base leading-relaxed">{p.problem}</p>
                           </section>
                           <section>
                             <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Architecture</h3>
                             <p className="text-gray-300 text-base leading-relaxed">{p.architecture}</p>
                           </section>
                           <section>
                             <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Key Features</h3>
                             <ul className="space-y-3">
                               {p.features.map((feature, idx) => (
                                 <li key={idx} className="flex items-start gap-3 text-gray-300 text-base">
                                   <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                                     <CheckCircle2 className="w-3 h-3 text-white" />
                                   </div>
                                   <span className="leading-relaxed">{feature}</span>
                                 </li>
                               ))}
                             </ul>
                           </section>
                        </div>
                        
                        {/* Right Column */}
                        <div className="flex flex-col gap-10">
                           <section>
                             <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Solution</h3>
                             <p className="text-gray-300 text-base leading-relaxed">{p.solution}</p>
                           </section>
                           <section>
                             <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Challenges</h3>
                             <p className="text-gray-300 text-base leading-relaxed">{p.challenges}</p>
                           </section>
                           <section>
                             <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Metrics</h3>
                             <div className="grid grid-cols-2 gap-3">
                                {p.metricsList.map((m, idx) => (
                                  <div key={idx} className="p-4 rounded-xl bg-[#121820] border border-white/5 flex flex-col gap-2">
                                     <span className="text-2xl">{m.icon}</span>
                                     <span className="text-xl font-bold text-white mt-1">{m.value}</span>
                                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{m.label}</span>
                                  </div>
                                ))}
                             </div>
                           </section>
                        </div>
                     </div>
                     
                     {/* Bottom Buttons */}
                     <div className="flex flex-col sm:flex-row items-center gap-6 pt-16 pb-32 border-t border-white/10 mt-8">
                       {p.liveUrl && (
                         <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors text-lg">
                            <Globe className="w-5 h-5" />
                            View Live Site
                         </a>
                       )}
                       <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-full bg-[#121820] border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors text-lg">
                          <FaGithub className="w-5 h-5" />
                          View Source Code
                       </a>
                     </div>
                  </div>
               </motion.div>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
