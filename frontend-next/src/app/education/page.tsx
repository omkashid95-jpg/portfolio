"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function EducationPage() {
  const [educationData, setEducationData] = useState<any[]>([]);
  const [siteContent, setSiteContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [data, contentData] = await Promise.all([
          fetchAPI('/education'),
          fetchAPI('/content')
        ]);
        setEducationData(data);
        
        const contentMap: Record<string, string> = {};
        contentData.forEach((item: any) => {
          contentMap[item.key] = item.value;
        });
        setSiteContent(contentMap);
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getColSpan = (index: number) => {
    const spans = ['md:col-span-8', 'md:col-span-4', 'md:col-span-6', 'md:col-span-6'];
    return spans[index % spans.length];
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .sunrise-glow {
            background: radial-gradient(circle at 50% -20%, rgba(255, 92, 0, 0.15) 0%, transparent 60%);
        }
        .orbital-line {
            position: absolute;
            border: 1px solid rgba(195, 192, 255, 0.05);
            border-radius: 50%;
            pointer-events: none;
        }
        .bento-card {
            background: rgba(31, 31, 40, 0.6);
            border: 1px solid rgba(70, 69, 85, 0.5);
            backdrop-filter: blur(12px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bento-card:hover {
            border-color: #ffb695;
            transform: translateY(-4px);
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
        }
      `}} />

      {/* HEADER */}
      <Navbar resumeUrl="/resume.pdf" activePath="/education" />

      {/* MAIN CONTENT */}
      <main className="flex-grow relative overflow-x-hidden bg-[#121212] min-h-screen pt-32 pb-24 text-[#e4e1ee]">
        {/* Atmospheric Background Elements */}
        <div className="absolute inset-0 sunrise-glow pointer-events-none"></div>
        <div className="orbital-line w-[800px] h-[800px] -top-96 -left-96"></div>
        <div className="orbital-line w-[600px] h-[600px] top-1/2 -right-48"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          {/* Page Header */}
          <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-bold text-[#ffb695] mb-2 tracking-widest uppercase">ACADEMIC PATHWAY</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Educational Foundations</h2>
              <p className="text-base text-[#c7c4d8] leading-relaxed">
                A comprehensive overview of my technical education and specialized research focus in high-performance computing and artificial intelligence.
              </p>
            </div>
          </section>

          {/* Bento Grid Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {loading ? (
              <div className="md:col-span-12 text-center text-white py-12">Loading education details...</div>
            ) : educationData.length === 0 ? (
              <div className="md:col-span-12 text-center text-[#c7c4d8] py-12">No education records found. Please add them from the admin panel.</div>
            ) : (
              educationData.map((edu, index) => (
                <div key={edu.id || index} className={`${getColSpan(index)} group`}>
                  <div className="bento-card p-8 rounded-xl relative h-full flex flex-col justify-between">
                    <div>
                      <span className="px-2 py-1 bg-[#ffb695]/10 text-[#ffb695] font-mono text-xs font-bold rounded mb-2 inline-block tracking-widest">
                        {index === 0 ? 'LATEST' : 'ACADEMIC'}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-1">{edu.degree}</h3>
                      <p className="text-base text-[#c3c0ff] font-semibold mb-6">{edu.institution}</p>
                      
                      {edu.description && (
                        <div className="mb-6">
                          <p className="text-[14px] text-[#c7c4d8] leading-relaxed whitespace-pre-wrap">{edu.description}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-t border-[#464555]/50 pt-4">
                        <span className="font-mono text-sm text-[#c7c4d8]">Year</span>
                        <span className="font-mono text-sm text-white">{edu.start_date || '?'} - {edu.end_date || 'Present'}</span>
                      </div>
                      
                      {edu.cgpa && (
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-sm text-[#c7c4d8]">CGPA</span>
                          <span className="font-mono text-sm text-[#ffb695] font-bold">{edu.cgpa}</span>
                        </div>
                      )}

                      {edu.percentage && (
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-sm text-[#c7c4d8]">Percentage</span>
                          <span className="font-mono text-sm text-[#ffb695] font-bold">{edu.percentage}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            
          </div>

          {/* Skill Overlay / Certification CTA */}
          <section className="mt-8 bento-card rounded-xl p-8 overflow-hidden relative">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
              <span className="material-symbols-outlined text-[240px] text-white" data-icon="verified">verified</span>
            </div>
            <div className="max-w-xl relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">Beyond Academics</h3>
              <p className="text-base text-[#c7c4d8] mb-6 leading-relaxed">
                In addition to formal education, I maintain a rigorous self-study regimen and hold numerous certifications in Python, Data Science, Machine Learning, and Generative AI.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link className="px-6 py-2 border border-[#c3c0ff] text-[#c3c0ff] font-medium rounded-lg hover:bg-[#c3c0ff]/10 transition-all flex items-center gap-2 text-sm" href="/certifications">
                  View Professional Certifications
                  <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <Footer
        instagramLink={siteContent['instagram_link'] || ""}
        whatsappLink={siteContent['whatsapp_link'] || ""}
        linkedinLink={siteContent['linkedin_link'] || ""}
        githubLink={siteContent['github_link'] || ""}
      />
    </>
  );
}
