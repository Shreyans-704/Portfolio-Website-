"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const GithubIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.26c3-.3 6-1.5 6-6.44a5.2 5.2 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.15-3.7s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.3 5.3 0 0 0-.15 3.7 5.2 5.2 0 0 0-1.5 3.8c0 4.9 3 6.1 6 6.44a4.8 4.8 0 0 0-1 3.26v4"></path>
    <path d="M9 20c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LeetCodeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 3.497 3.559 5.83 5.83 0 0 0 2.626.387 5.83 5.83 0 0 0 2.087-.417 5.83 5.83 0 0 0 1.547-.89l5.312-5.32c.504-.505.526-1.309.05-1.848-.48-.545-1.29-.545-1.77.01l-5.337 5.343a3.642 3.642 0 0 1-1.4.757 3.64 3.64 0 0 1-1.398.055 3.64 3.64 0 0 1-1.202-.387 3.64 3.64 0 0 1-1.29-.974 3.64 3.64 0 0 1-.689-1.32 3.64 3.64 0 0 1 .055-1.4 3.64 3.64 0 0 1 .455-1.157 3.64 3.64 0 0 1 .84-1.01l3.85-4.116.01-.013c.034-.037.07-.07.108-.102l5.358-5.71a.95.95 0 0 1 .632-.3h.001c.21 0 .416.075.57.21l3.52 3.125c.57.502.57 1.34 0 1.844-.57.505-1.49.505-2.06.01l-2.49-2.21-4.78 5.105zM3.486 17.525a3.64 3.64 0 0 1 .42 1.168 3.64 3.64 0 0 1-.055 1.4 3.64 3.64 0 0 1-.689 1.32 3.64 3.64 0 0 1-1.29.974 3.64 3.64 0 0 1-1.202.387 3.64 3.64 0 0 1-1.398-.055 3.64 3.64 0 0 1-1.4-.757 3.64 3.64 0 0 1-1.006-1.583 3.64 3.64 0 0 1 .055-1.4 3.64 3.64 0 0 1 .455-1.157 3.64 3.64 0 0 1 .84-1.01l3.85-4.116c.48-.545 1.29-.545 1.77-.01.476.54.454 1.343-.05 1.848l-1.34 1.34zM20.25 10.3c.05 0 .1.02.13.06l1.37 1.37a.89.89 0 0 1 0 1.25l-7.36 7.37c-.42.42-1.08.42-1.5 0l-1.37-1.37a.89.89 0 0 1 0-1.25l7.36-7.37c.18-.18.42-.25.67-.25z"/>
  </svg>
);

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "why-me", label: "Why Me" },
  { id: "contact", label: "Contact" }
];

// Hamburger / Close icon component
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="flex flex-col gap-[5px] w-5">
    <span className={`block h-[2px] bg-gray-400 transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[7px] bg-white" : "w-5"}`} />
    <span className={`block h-[2px] bg-gray-400 transition-all duration-300 ${isOpen ? "opacity-0 w-0" : "w-5"}`} />
    <span className={`block h-[2px] bg-gray-400 transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[7px] bg-white" : "w-5"}`} />
  </div>
);

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false); // Closed by default on all screens

  useEffect(() => {
    // Open by default on desktop, closed on mobile
    if (window.innerWidth >= 1024) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating toggle button — always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-[60] p-2.5 rounded-xl bg-[#070708]/80 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-200 shadow-lg"
        aria-label="Toggle sidebar"
      >
        <HamburgerIcon isOpen={isOpen} />
      </button>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="fixed top-0 left-0 h-screen w-72 md:w-64 bg-[#070708]/95 backdrop-blur-3xl border-r border-white/5 z-50 flex flex-col justify-between py-12"
      >
        {/* Brand / Logo */}
        <div className="px-10 cursor-pointer" onClick={() => scrollToSection("home")}>
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden mb-6 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <Image src="/logo.png" alt="Shreyans Logo" fill className="object-contain" />
          </div>
          <h2 className="text-white font-semibold text-xl tracking-tight">Shreyans.</h2>
          <p className="text-blue-400 font-medium text-[0.65rem] tracking-[0.2em] uppercase mt-2">Creative Engineer</p>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 px-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-3 text-left text-sm font-medium transition-all duration-300 rounded-xl group ${
                  isActive ? "text-white" : "text-gray-500 hover:text-gray-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Socials */}
        <div className="px-10 flex gap-6 text-gray-500">
          <a href="https://github.com/Shreyans-704" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <GithubIcon className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/Shreyans-Jaiswal" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a href="https://x.com/Shreyans704" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <TwitterIcon className="w-5 h-5" />
          </a>
          <a href="https://leetcode.com/u/shreyans_704/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <LeetCodeIcon className="w-5 h-5" />
          </a>
        </div>
      </motion.aside>
    </>
  );
}
