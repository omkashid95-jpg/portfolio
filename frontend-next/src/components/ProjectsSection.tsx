"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies?: string;
  image_url?: string;
  source_link?: string;
  live_link?: string;
  created_at: string;
}

export default function ProjectsSection({ projects = [] }: { projects?: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Scroll Reveal logic
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    if (sectionRef.current) {
        sectionRef.current.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // Mouse glow effect for cards
    if (sectionRef.current) {
        sectionRef.current.querySelectorAll('.project-glass-card').forEach(card => {
            const htmlCard = card as HTMLElement;
            htmlCard.addEventListener('mousemove', e => {
                const rect = htmlCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                htmlCard.style.setProperty('--mouse-x', `${x}px`);
                htmlCard.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
  }, [projects]); // re-run if projects change

  // Dummy placeholder if no projects are provided (for previewing the design before database is populated)
  const displayProjects = projects.length > 0 ? projects : [];

  return (
    <section id="projects" ref={sectionRef} className="pt-32 pb-32 px-6 md:px-12 w-full relative z-10 overflow-hidden bg-gradient-to-b from-[#121212] to-[#181818]">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/30 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Hero / Header */}
        <div className="mb-20 reveal opacity-0 translate-y-[30px] transition-all duration-800 ease-[cubic-bezier(0.2,0.8,0.2,1)] [&.active]:opacity-100 [&.active]:translate-y-0 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 text-white max-w-3xl">
            Featured <span className="text-orange-500">Projects</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
            A showcase of distributed architectures, machine learning pipelines, and high-performance frontend applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-12 gap-6 bento-grid">
          {displayProjects.map((project, index) => {
            // Make the first item large, others small
            const isFeatured = index === 0;
            const techList = project.technologies ? project.technologies.split(',').map(t => t.trim()) : [];

            if (isFeatured) {
              return (
                <div key={project.id} className="glass-effect project-card col-span-12 lg:col-span-8 reveal opacity-0 translate-y-[30px] transition-all duration-800 ease-[cubic-bezier(0.2,0.8,0.2,1)] [&.active]:opacity-100 [&.active]:translate-y-0 rounded-2xl flex flex-col md:flex-row group relative overflow-hidden hover:-translate-y-2 hover:border-orange-500/30 hover:shadow-[0_20px_40px_rgba(255,77,0,0.1)]">
                  <div className="md:w-1/2 overflow-hidden relative min-h-[320px]">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{backgroundImage: `url('${project.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuA_6T1CupprebPbaN-LYJSX5Lw0itCvNCJp4zCG3xK0oLcOrldnkyes8bK5PjmgDW-Py2Mo7lsENG0lkjipANmHof7cg_knMqT0I1XtFiA16E3y_R-Hz1duhsGKulyi1C62K45E85uXDuOZhTpIQX-bRuXEWaHCFnFZM06sTfKBrhNdDme2LhJhq5Eu_HKB4G0hpTCrCNaEf5bA1YlxHfPgdHISTLODguB_1svQIzkJTVNpWmGNDF1Oqy8CZ83E8GwGiCtBGCgq_Vo"}')`}}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-80 md:opacity-100"></div>
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-between relative z-10">
                    <div>
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {techList.map((tech, i) => (
                          <span key={i} className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-widest ${i === 0 ? 'border border-orange-500/30 text-orange-400 bg-orange-500/10' : 'border border-white/10 text-gray-400 bg-white/5'}`}>{tech}</span>
                        ))}
                      </div>
                      <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-orange-500 transition-colors">{project.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-4">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                      <button onClick={() => setSelectedProject(project)} className="flex-1 py-3 rounded-xl border border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white transition-all font-bold tracking-widest text-[12px] text-center">
                        More Details
                      </button>
                      {(project.live_link || project.source_link) && (
                        <a href={project.live_link || project.source_link} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white transition-all font-bold tracking-widest text-[12px] shadow-[0_0_15px_rgba(255,77,0,0.3)]">
                          {project.live_link ? "Live Preview" : "Source Code"}
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={project.id} className="glass-effect project-card col-span-12 md:col-span-6 lg:col-span-4 reveal opacity-0 translate-y-[30px] transition-all duration-800 ease-[cubic-bezier(0.2,0.8,0.2,1)] [&.active]:opacity-100 [&.active]:translate-y-0 rounded-2xl flex flex-col group relative overflow-hidden hover:-translate-y-2 hover:border-orange-500/30 hover:shadow-[0_20px_40px_rgba(255,77,0,0.1)]">
                  <div className="h-48 overflow-hidden relative flex-shrink-0">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000" style={{backgroundImage: `url('${project.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuD_3m0_Qy7JE8QIa2G6qxn1HZZEY_im-RqXX7AvTv-mR2Vmc7ZXQ4JPxzxUCLqzpU8bZpG-SvDHUo9euWR-NXB8K4r9s2Yen-S3WDxaVmdlJnQS3PvqO1x0QZ1e_Krjy6Vf3VD1brpkMeEf8fO3N2NBVY_amPbfqtp-hhkEPBM8dsX_ro8yBC11tmxDBC-vTS82Jc6nEarrdVEQVslw0tkDGFz9zfizi9IZB9tIhlgmzRLDBabuGx7vOuF0D5FsHvP1Z26r8swYY30"}')`}}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow relative z-10">
                    <div className="flex gap-2 mb-4 flex-wrap max-h-20 overflow-y-auto custom-scrollbar">
                      {techList.map((tech, i) => (
                        <span key={i} className="px-2 py-1 rounded-md text-[10px] border border-orange-500/30 text-orange-400 bg-orange-500/10 uppercase font-bold tracking-widest">{tech}</span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-500 transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                      <button onClick={() => setSelectedProject(project)} className="text-orange-500 hover:text-orange-400 transition-colors text-sm font-bold border border-orange-500/50 px-3 py-1.5 rounded-lg hover:bg-orange-500/10">
                        More Details
                      </button>
                      {(project.live_link || project.source_link) && (
                        <a href={project.live_link || project.source_link} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 text-sm font-bold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg">
                          {project.live_link ? "Live Preview" : "Source Code"} <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          })}

          {displayProjects.length === 0 && (
            <div className="col-span-12 py-20 text-center text-gray-500">
              No projects found. Add some from the admin panel!
            </div>
          )}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedProject(null)}>
          <div className="bg-[#181818] border border-orange-500/30 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative shadow-[0_0_50px_rgba(255,77,0,0.15)]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 bg-black/50 p-2 rounded-full hover:bg-orange-500 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="md:w-5/12 h-[250px] md:h-auto md:min-h-full bg-cover bg-center relative" style={{backgroundImage: `url('${selectedProject.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuD_3m0_Qy7JE8QIa2G6qxn1HZZEY_im-RqXX7AvTv-mR2Vmc7ZXQ4JPxzxUCLqzpU8bZpG-SvDHUo9euWR-NXB8K4r9s2Yen-S3WDxaVmdlJnQS3PvqO1x0QZ1e_Krjy6Vf3VD1brpkMeEf8fO3N2NBVY_amPbfqtp-hhkEPBM8dsX_ro8yBC11tmxDBC-vTS82Jc6nEarrdVEQVslw0tkDGFz9zfizi9IZB9tIhlgmzRLDBabuGx7vOuF0D5FsHvP1Z26r8swYY30"}')`}}>
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#181818] via-transparent to-transparent"></div>
            </div>
            
            <div className="md:w-7/12 p-6 md:p-10 flex flex-col overflow-y-auto custom-scrollbar max-h-full">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-white">{selectedProject.title}</h3>
              
              <div className="mb-6">
                <h4 className="text-xs text-orange-500 uppercase tracking-widest font-bold mb-3">Technologies Used</h4>
                <div className="flex gap-2 flex-wrap">
                  {selectedProject.technologies?.split(',').map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-md text-[11px] uppercase font-bold tracking-wider border border-white/10 text-gray-300 bg-white/5">{tech.trim()}</span>
                  ))}
                </div>
              </div>
              
              <div className="mb-8 flex-grow">
                <h4 className="text-xs text-orange-500 uppercase tracking-widest font-bold mb-3">About the Project</h4>
                <div className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {selectedProject.description}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10 mt-auto">
                {selectedProject.live_link && (
                  <a href={selectedProject.live_link} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_15px_rgba(255,77,0,0.3)]">
                    Live Preview
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                )}
                {selectedProject.source_link && (
                  <a href={selectedProject.source_link} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-4 rounded-xl bg-transparent border-2 border-orange-500/50 hover:bg-orange-500/10 text-orange-400 hover:text-orange-300 font-bold text-sm tracking-wide transition-colors">
                    Source Code
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
