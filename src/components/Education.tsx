export default function Education() {
  return (
    <section id="education" className="w-full relative border-t border-white/5 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-2 md:mb-3 lg:mb-8 text-white">
          Education
        </h2>

        <div className="max-w-xl rounded-2xl bg-white/[0.02] border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
          {/* Compact horizontal education row: logo | institution + degree | dates */}
          <div className="flex flex-row items-center gap-3 md:gap-4 p-4 md:p-5">
            {/* No NIT Jalandhar logo asset exists in the repository, so a text badge
                with the institute initials stands in for the logo mark. */}
            <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center">
              <span className="text-xs md:text-sm font-bold text-white tracking-tighter">
                NITJ
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm md:text-base font-semibold text-white leading-tight">
                National Institute of Technology, Jalandhar
              </div>
              <div className="mt-0.5 md:mt-1 text-xs md:text-sm text-gray-400 leading-tight">
                B.Tech in Information Technology
              </div>
            </div>

            <div className="shrink-0 text-right whitespace-nowrap">
              <div className="text-xs md:text-sm font-mono text-gray-400">
                2023 - 2027
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
