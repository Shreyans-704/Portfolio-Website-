import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import SystemSimulator from "@/components/SystemSimulator";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import GithubStats from "@/components/GithubStats";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import WhyMe from "@/components/WhyMe";
import Contact from "@/components/Contact";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shreyans Jaiswal",
    url: "https://www.shreyansjaiswal.me",
    jobTitle: "Software Engineer & AI Developer",
    affiliation: {
      "@type": "EducationalOrganization",
      name: "NIT Jalandhar",
      url: "https://www.nitj.ac.in",
    },
    sameAs: [
      "https://github.com/Shreyans-704",
      "https://linkedin.com/in/Shreyans-Jaiswal",
      "https://x.com/Shreyans704",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shreyans Jaiswal",
    url: "https://www.shreyansjaiswal.me",
    description:
      "Personal portfolio of Shreyans Jaiswal — Software Engineer and AI Developer at NIT Jalandhar.",
    author: {
      "@type": "Person",
      name: "Shreyans Jaiswal",
    },
  },
];

export default function Home() {
  return (
    <main className="bg-[#0f0f11] min-h-screen font-sans selection:bg-blue-500/30 selection:text-white relative overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Sidebar />
      <div className="w-full relative flex flex-col">
        <div id="home"><Hero /></div>
        <SystemSimulator />
        <div id="about"><About /></div>
        <div id="experience"><Experience /></div>
        <div id="projects"><Projects /></div>
        <div id="github"><GithubStats /></div>
        <div id="skills"><Skills /></div>
        <div id="achievements"><Achievements /></div>
        <div id="why-me"><WhyMe /></div>
        <div id="contact"><Contact /></div>
      
      <footer className="w-full py-8 border-t border-white/5 flex items-center justify-center px-6 bg-[#070708] relative z-10">
        <p className="text-gray-600 text-xs font-medium tracking-widest uppercase text-center">
          © {new Date().getFullYear()} Shreyans Jaiswal — Engineered with precision.
        </p>
      </footer>
      </div>
    </main>
  );
}
