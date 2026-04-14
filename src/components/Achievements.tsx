"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award, ShieldCheck, Trophy, Target } from "lucide-react";
import MarqueeStrip from "./MarqueeStrip";

export default function Achievements() {
  const certifications = [
    {
      title: "Machine Learning Specialization",
      issuer: "DeepLearning.AI",
      date: "2026",
      desc: "Comprehensive specialization covering regression, classification, and neural networks.",
      credentialId: "UREFPDPF8VMM",
      link: "https://www.coursera.org/account/accomplishments/specialization/UREFPDPF8VMM"
    },
    {
      title: "Supervised Machine Learning: Regression and Classification",
      issuer: "DeepLearning.AI",
      date: "Jan 2026",
      desc: "Learned linear and logistic regression and gradient descent modeling.",
      credentialId: "TAWAV4TQHL8C",
      link: "https://www.coursera.org/account/accomplishments/verify/TAWAV4TQHL8C"
    },
    {
      title: "Advanced Learning Algorithms",
      issuer: "DeepLearning.AI",
      date: "Feb 2026",
      desc: "Built deep neural networks, decision trees, and ensemble forests.",
      credentialId: "8FI3VRVRPGBF",
      link: "https://www.coursera.org/account/accomplishments/verify/8FI3VRVRPGBF"
    },
    {
      title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
      issuer: "DeepLearning.AI",
      date: "Apr 2026",
      desc: "Learned clustering, recommendation systems, and reinforcement learning fundamentals.",
      credentialId: "PKVNNRJ5OWSI",
      link: "https://www.coursera.org/account/accomplishments/verify/PKVNNRJ5OWSI"
    },
    {
      title: "GitLab Certification",
      issuer: "GitLab",
      date: "Completed",
      desc: "Hands-on CI/CD pipeline automation and DevOps workflows.",
      credentialId: "y29W6B7LT5CK...",
      link: "https://university.gitlab.com/c/y29W6B7LT5CKmbzOTasIRQ"
    },
    {
      title: "McKinsey Forward Program",
      issuer: "McKinsey & Company",
      date: "Completed",
      desc: "12 core modules on structured thinking and data-driven decisions.",
      credentialId: "f19e6076...",
      link: "https://www.credly.com/badges/f19e6076-553d-41db-b335-25226b67b9be/linked_in_profile"
    },
    {
      title: "Google Cloud Skills Boost",
      issuer: "Google",
      date: "Completed",
      desc: "Completed 10+ labs including GenAI apps, Cloud Vision API, and Cloud Run.",
      credentialId: "590d51e9...",
      link: "https://www.cloudskillsboost.google/public_profiles/590d51e9-ac1d-43eb-8099-d97fbfb9e12f"
    },
    {
      title: "Docker Essentials",
      issuer: "Udemy",
      date: "Completed",
      desc: "Containerization, Docker workflows, and deployment practices.",
      credentialId: "",
      link: "https://www.udemy.com/"
    }
  ];

  const badges = [
    { title: "Built 4+ Production Apps", icon: <Target className="w-4 h-4 text-blue-400" /> },
    { title: "EIL System (500+ Users)", icon: <ShieldCheck className="w-4 h-4 text-green-400" /> },
    { title: "<50ms Sync Latency", icon: <Trophy className="w-4 h-4 text-yellow-400" /> },
    { title: "AI SaaS (100+ Users)", icon: <Award className="w-4 h-4 text-orange-400" /> }
  ];

  return (
    <section id="achievements" className="w-full relative border-t border-white/5">
      <MarqueeStrip words={["VERIFIED SKILLS", "LIFELONG LEARNER", "CERTIFIED", "KEEP GROWING", "KNOWLEDGE IS POWER", "EARNED NOT GIVEN", "STAY CURIOUS"]} />
      <div className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-16">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            Achievements <span className="text-gray-500">&amp; Certifications</span>
          </h3>
          <p className="text-lg text-gray-400 font-light max-w-2xl leading-relaxed mb-8">
            Verified credentials and measurable production achievements defining my development standard.
          </p>

          {/* Minimal Badges Bar */}
          <div className="flex flex-wrap gap-3">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
              >
                {badge.icon}
                <span className="text-xs font-semibold text-gray-300 tracking-wide">{badge.title}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] transition-colors duration-300 h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xl font-bold tracking-tight text-white mb-2 leading-tight pr-4">
                    {cert.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                    <span className="text-blue-400">{cert.issuer}</span>
                    {cert.date && (
                      <>
                        <span className="opacity-30">•</span>
                        <span>{cert.date}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:text-blue-400 transition-colors shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>

              <p className="text-base text-gray-400 leading-relaxed mb-8 font-light flex-grow">
                {cert.desc}
              </p>

              <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                 {cert.credentialId ? (
                   <div className="flex flex-col">
                     <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Credential ID</span>
                     <span className="text-xs text-gray-300 font-mono mt-1">{cert.credentialId}</span>
                   </div>
                 ) : (
                   <span />
                 )}
                 <span className="text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View
                 </span>
              </div>
            </motion.a>
          ))}
        </div>
        
      </div>
      </div>
    </section>
  );
}
