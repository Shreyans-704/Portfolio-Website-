import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import SystemSimulator from "@/components/SystemSimulator";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import WhyMe from "@/components/WhyMe";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#0f0f11] min-h-screen font-sans selection:bg-blue-500/30 selection:text-white flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64 relative min-w-0 flex flex-col overflow-x-hidden">
        <div id="home"><Hero /></div>
        <SystemSimulator />
        <div id="about"><About /></div>
        <div id="experience"><Experience /></div>
        <div id="projects"><Projects /></div>
        <div id="skills"><Skills /></div>
        <Achievements />
        <WhyMe />
        <div id="contact"><Contact /></div>
      
      <footer className="w-full py-8 border-t border-white/5 flex items-center justify-center px-6 bg-[#070708]">
        <p className="text-gray-600 text-xs font-medium tracking-widest uppercase text-center">
          © {new Date().getFullYear()} Shreyans Jaiswal — Engineered with precision.
        </p>
      </footer>
      </div>
    </main>
  );
}
