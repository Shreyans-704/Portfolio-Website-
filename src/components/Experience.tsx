"use client";

import { motion } from "framer-motion";
import MarqueeStrip from "./MarqueeStrip";

export default function Experience() {
  const experiences = [
    {
      role: "Salesforce Developer Intern",
      company: "Conscendo Technologies",
      companyLink:
        "https://www.linkedin.com/company/conscendo/posts/?feedView=all",
      duration: "June – August 2026",
      location: "Hyderabad, India",
      highlight: "25+ Salesforce Flows",
      description:
        "Built Salesforce automation and Data Cloud solutions to streamline enterprise CRM processes.",
      bullets: [
        "Implemented 25+ Salesforce Screen and Record-Triggered Flows, cutting manual effort by 20%",
        "Built an AI-powered Salesforce Flow Generator using Apex and XML parsing",
        "Configured Salesforce Data Cloud pipelines for identity resolution and customer segmentation",
      ],
      tech: ["Salesforce", "Apex", "XML", "Flows", "Data Cloud 360"],
    },
    {
      role: "Software Developer Intern",
      company: "Engineers India Limited (EIL)",
      companyLink:
        "https://www.linkedin.com/company/engineers-india-limited/posts/?feedView=all",
      duration: "June – July 2025",
      location: "New Delhi, India",
      highlight: "500+ Monthly Users",
      description:
        "Developed and deployed a full-stack MERN scholarship platform with secure backend services and automated testing.",
      bullets: [
        "Developed and deployed a MERN scholarship platform serving 500+ monthly users",
        "Established secure backend communication using JWT authentication and REST APIs",
        "Created Jest test suites achieving 70%+ code coverage",
      ],
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Jest"],
    },
  ];

  return (
    <section className="w-full border-t border-white/5">
      <MarqueeStrip words={["ENTERPRISE ENGINEERING", "PRODUCTION READY", "REAL-WORLD IMPACT", "END-TO-END OWNERSHIP"]} />
      <div className="py-24 md:py-32 max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            Professional <span className="text-gray-500">Experience</span>
          </h3>
          <p className="text-lg text-gray-400 max-w-2xl">
            Building production software across enterprise automation and full-stack engineering.
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative md:pl-12"
            >
              <div className="hidden md:block absolute left-0 inset-y-0 w-px bg-white/10" />
              <div className="hidden md:block absolute -left-1.5 top-8 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-[#0b0f14]" />

              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 sm:p-8 hover:bg-white/[0.04] transition-colors">
                <div className="flex flex-col md:flex-row justify-between gap-3 mb-5">
                  <div>
                    <h4 className="text-2xl font-bold">{exp.role}</h4>
                    <a href={exp.companyLink} target="_blank" rel="noopener noreferrer"
                      className="text-blue-400 text-lg hover:text-blue-300">
                      {exp.company} ↗
                    </a>
                  </div>
                  <div className="md:text-right font-mono text-sm text-gray-500">
                    <div>{exp.duration}</div>
                    <div>{exp.location}</div>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                      {exp.highlight}
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-2xl">
                  {exp.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-4 text-gray-300">
                      <span className="text-blue-500">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/5 rounded-md text-xs text-gray-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}