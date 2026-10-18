"use client";

import { useCallback, useEffect, useState } from "react";
import { Home, GitBranch, X, Mail, FileText } from "lucide-react";

// LinkedIn is not exported by the installed lucide-react version, so a small
// component renders an inline SVG instead.
function LinkedinIcon(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

type NavItem = {
  id: string;
  label: string;
  href: string;
  external: boolean;
  icon: any;
};

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "#home", external: false, icon: Home },
  { id: "github", label: "GitHub", href: "https://github.com/Shreyans-704", external: true, icon: GitBranch },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/Shreyans-Jaiswal", external: true, icon: LinkedinIcon },
  { id: "x", label: "X", href: "https://x.com/Shreyans704", external: true, icon: X },
  { id: "email", label: "Email", href: "mailto:shreyans.jaiwal704@gmail.com", external: false, icon: Mail },
  {
    id: "resume",
    label: "Resume",
    href:
      "https://drive.google.com/file/d/1SzLc_YT1kcsOtnqir4QxAWtk2_WeFXAS/view?usp=drive_link",
    external: true,
    icon: FileText,
  },
];

// Vertical separators split the bar into logical groups:
// Home | GitHub, LinkedIn, X | Email, Resume
const SEPARATOR_AFTER_INDEXES = new Set([0, 3]);

export default function BottomNav() {
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Visible by default; hidden when the Contact section enters the viewport.
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const contactEl = document.getElementById("contact");
    if (!contactEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Hide the nav when Contact enters the viewport (scrolling down),
          // show it again when Contact leaves the viewport (scrolling up).
          setIsVisible(!entry.isIntersecting);
        });
      },
      { threshold: [0] }
    );

    observer.observe(contactEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      aria-label="Bottom navigation"
      className={`fixed left-1/2 -translate-x-1/2 top-[calc(16px+env(safe-area-inset-top,0px))] z-[60] md:hidden transition-all duration-300 ease-in-out ${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none -translate-y-[120%]"
      }`}
    >
      {/* Fixed near the top, centered, clears the phone's status bar via safe-area inset */} 
      <div
        className="flex items-center gap-2 rounded-full bg-black/[70] backdrop-blur-md border border-white/10 px-3 py-2 shadow-2xl shadow-black/50 max-w-[380px] w-full"
      >
        {NAV_ITEMS.map((item, i) => {
          const Icon = item.icon;
          const isInternalAnchor = item.href === "#home";

          return (
            <>
              {isInternalAnchor ? (
                <button
                  onClick={() => scrollToSection(item.id)}
                  aria-label={item.label}
                  aria-current="page"
                  className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </button>
              ) : (
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-label={`${item.label}${item.external ? " — opens in a new tab" : ""}`}
                  className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              )}

              {i < NAV_ITEMS.length - 1 && SEPARATOR_AFTER_INDEXES.has(i) && (
                <div className="h-5 w-[1px] shrink-0 bg-white/20" aria-hidden="true" />
              )}
            </>
          );
        })}
      </div>
    </nav>
  );
}
