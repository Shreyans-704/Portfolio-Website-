"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import MarqueeStrip from "./MarqueeStrip";

export default function Experience() {
  const experiences = [
    {
      role: "Software Engineering Intern",
      company: "Conscendo Technologies",
      companyLink: "https://www.linkedin.com/company/conscendo/posts/?feedView=all",
      duration: "June 2026 - Aug 2026",
      highlight: "AI-Powered Products",
      description: "Joining the engineering team to build scalable and responsive AI-integrated solutions for enterprise clients.",
      bullets: [
        "Upcoming internship focused on modern DevOps tools with GenAI integrations"
      ],
      tech: ["React", "Next.js", "AI/LLMs", "Salesforce CLI", "GCP", "AWS"]
    },
    {
      role: "Software Engineering Summer Trainee",
      company: "Engineers India Limited (EIL)",
      companyLink: "https://www.linkedin.com/company/engineers-india-limited/posts/?feedView=all",
      duration: "June 2025 - July 2025",
      highlight: "500+ active users",
      description: "Architected and developed a full-stack, enterprise-grade application for tracking pipeline status. Integrated MongoDB, Express.js, React, and Node.js for scalability.",
      bullets: [
        "Led a team of 4 to deliver the MERN application from scratch to production.",
        "Engineered robust RESTful authentication flows using JWT, securing user dashboards.",
        "Implemented standardized unit testing (Jest) achieving 70%+ overall code coverage.",
      ],
      tech: ["React", "Node.js", "Express", "MongoDB", "Redux", "Jest"]
    }
  ];

  return (
    <section className="w-full relative border-t border-white/5">
      <MarqueeStrip words={["ENTERPRISE ENGINEERING", "TEAM LEADERSHIP", "PRODUCTION READY", "REAL-WORLD IMPACT", "AGILE DEVELOPMENT", "END-TO-END OWNERSHIP"]} />
      <div className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 relative z-10">

          <div className="mb-16">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Professional <span className="text-gray-500">Experience</span>
            </h3>
            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl">
              A track record of taking engineered architectures to production within enterprise environments.
            </p>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative pl-8 md:pl-0"
              >
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[1px] bg-white/10" />

                <div className="md:pl-12 relative">
                  <div className="hidden md:flex absolute -left-[5.5px] top-8 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-[#0b0f14]" />

                  <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 sm:p-8 hover:bg-white/[0.04] transition-colors duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <div>
                        <h4 className="text-2xl font-bold tracking-tight text-white">{exp.role}</h4>
                        {exp.companyLink ? (
                          <a href={exp.companyLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-medium text-lg tracking-tight hover:text-blue-300 transition-colors inline-flex items-center gap-1 group/link">
                            {exp.company}
                            <svg className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                          </a>
                        ) : (
                          <span className="text-blue-400 font-medium text-lg tracking-tight">{exp.company}</span>
                        )}
                      </div>
                      <div className="flex flex-col md:items-end font-mono">
                        <span className="text-gray-500 text-sm">{exp.duration}</span>
                        <span className="text-xs bg-white/5 px-3 py-1 rounded-full mt-2 text-gray-300 border border-white/10">Metric: {exp.highlight}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-lg leading-[1.8] mb-6 max-w-2xl font-light">
                      {exp.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {exp.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-4 text-gray-300 text-base leading-relaxed items-start">
                          <span className="text-blue-500 font-bold mt-1 shrink-0">—</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-3 py-1 bg-white/5 border border-white/5 rounded-md text-xs font-medium text-gray-400 hover:text-white transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
