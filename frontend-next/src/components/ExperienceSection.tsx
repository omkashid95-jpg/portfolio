export default function ExperienceSection({ experiences = [] }: { experiences?: any[] }) {
  return (
    <section id="experience" className="relative py-24 px-6 md:px-12 bg-[#181818] text-white border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center md:text-left mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Hands on <span className="text-orange-500">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            A track record of delivering high-performance software systems and interactive web experiences.
          </p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {experiences.length > 0 ? (
            experiences.map((exp: any, idx: number) => (
              <div key={exp.id || idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${idx === 0 ? 'is-active' : ''}`}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#0a0a0a] group-hover:border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(255,92,0,0.2)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-effect p-6 rounded-2xl group-hover:border-orange-500/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                    <span className="text-orange-500 text-sm font-medium uppercase tracking-wider">{exp.duration}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {exp.technology} {exp.experience_type ? `• ${exp.experience_type}` : ''}
                  </p>
                  <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
                    {exp.description}
                  </p>
                  {(exp.key_skills || exp.outcome) && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      {exp.key_skills && <p className="text-xs text-gray-400 mb-1"><strong>Skills:</strong> {exp.key_skills}</p>}
                      {exp.outcome && <p className="text-xs text-emerald-400"><strong>Outcome:</strong> {exp.outcome}</p>}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 pt-8 pb-12 w-full col-span-full">No experience added yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}
