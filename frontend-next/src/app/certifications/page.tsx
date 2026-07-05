import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { API_BASE_URL } from '@/lib/api';

export const dynamic = "force-dynamic";

export default async function CertificationsPage() {
  // Fetch certificates from the backend API
  let certificates = [];
  try {
    const res = await fetch(`${API_BASE_URL}/certificates`, { cache: 'no-store' });
    if (res.ok) {
      certificates = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch certificates:", error);
  }

  let educationData: any[] = [];
  try {
    const resEdu = await fetch(`${API_BASE_URL}/education`, { cache: 'no-store' });
    if (resEdu.ok) {
      educationData = await resEdu.json();
    }
  } catch (error) {
    console.error("Failed to fetch education:", error);
  }

  const certificateCount = certificates.length > 0 ? (certificates.length < 10 ? `0${certificates.length}` : certificates.length) : "00";
  
  let avgCgpa = "0.0";
  if (educationData.length > 0) {
    const cgpas = educationData.map((e: any) => parseFloat(e.cgpa)).filter((n: number) => !isNaN(n));
    if (cgpas.length > 0) {
      avgCgpa = (cgpas.reduce((a: number, b: number) => a + b, 0) / cgpas.length).toFixed(1);
    }
  }

  const uniqueUniversities = new Set(educationData.map((e: any) => e.institution).filter((i: any) => i)).size;
  const universityCount = uniqueUniversities < 10 ? `0${uniqueUniversities}` : `${uniqueUniversities}`;

  let siteContent: Record<string, string> = {};
  try {
    const resContent = await fetch(`${API_BASE_URL}/content`, { cache: 'no-store' });
    if (resContent.ok) {
      const data = await resContent.json();
      data.forEach((item: any) => {
        siteContent[item.key] = item.value;
      });
    }
  } catch (err) {
    console.error("Failed to fetch content:", err);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .sunrise-glow {
            background: radial-gradient(circle at 70% 30%, rgba(255, 92, 0, 0.15) 0%, transparent 60%);
        }
        .orbital-lines {
            background-image: radial-gradient(circle at 50% 50%, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.03) 41%, transparent 42%);
            background-size: 800px 800px;
            background-position: center;
        }
        .glass-card {
            background: rgba(31, 31, 40, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}} />
      <Navbar resumeUrl={siteContent['resume_url'] || "/resume.pdf"} activePath="/certifications" />
<main className="bg-[#121212] text-white overflow-x-hidden selection:bg-orange-500/30 relative min-h-screen pt-32 pb-24">

<div className="absolute inset-0 pointer-events-none sunrise-glow"></div>
<div className="absolute inset-0 pointer-events-none orbital-lines opacity-20"></div>
<div className="relative w-full max-w-7xl mx-auto px-8">

<div className="max-w-2xl mb-12 space-y-6" data-purpose="hero-text">
<div className="space-y-2">
  <div className="inline-flex items-center gap-2 mb-2">
    <div className="w-8 h-[2px] bg-orange-500"></div>
    <span className="text-orange-500 font-bold text-xs tracking-[0.2em] uppercase">CHECK OUT</span>
  </div>
  <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter">
    MY <span className="text-orange-500">CERTIFICATES</span>
  </h1>
  <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
    I have completed various high-performance programming and engineering courses to sharpen my architectural skills. Here is a curated selection of my professional credentials.
  </p>
</div>
<div className="mt-8">
<button className="px-6 py-3 border border-orange-500 text-orange-500 font-bold text-xs uppercase tracking-widest hover:bg-orange-500/10 transition-colors rounded-lg group">
    KNOW MORE 
    <span className="material-symbols-outlined align-middle ml-2 group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
  {certificates.length > 0 ? (
    certificates.map((cert: any) => (
      <div key={cert.id} className="glass-card p-md rounded-xl flex flex-col group hover:border-accent/40 transition-all duration-300">
        <div className="relative aspect-[4/3] mb-md overflow-hidden rounded-lg">
          <img 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            src={cert.image_url || '/placeholder-cert.png'} 
            alt={cert.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent"></div>
        </div>
        <div className="flex flex-col flex-grow">
          <h3 className="font-headline-lg text-lg mb-xs text-on-surface">{cert.title}</h3>
          <p className="text-label-caps font-label-caps text-accent mb-lg">{cert.issuer}</p>
          <div className="mt-auto flex justify-between items-center">
            {cert.date_issued && (
              <span className="text-code-sm font-code-sm text-on-surface-variant">Issued: {cert.date_issued}</span>
            )}
            {cert.credential_url && (
              <a href={cert.credential_url} target="_blank" rel="noreferrer" className="text-on-surface hover:text-accent transition-colors p-sm">
                <span className="material-symbols-outlined" data-icon="open_in_new">open_in_new</span>
              </a>
            )}
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-full text-center py-12 text-on-surface-variant">
      No certificates uploaded yet. Check back soon!
    </div>
  )}
</div>

<div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
<div className="glass-card p-8 rounded-xl border-l-4 border-orange-500">
<div className="text-4xl font-extrabold text-orange-500 mb-2">{certificateCount}</div>
<div className="text-xs font-bold text-gray-400 tracking-widest uppercase">CERTIFICATES</div>
</div>
<div className="glass-card p-8 rounded-xl">
<div className="text-4xl font-extrabold text-white mb-2">{universityCount}</div>
<div className="text-xs font-bold text-gray-400 tracking-widest uppercase">INSTITUTIONS</div>
</div>
<div className="glass-card p-8 rounded-xl">
<div className="text-4xl font-extrabold text-white mb-2">{avgCgpa}</div>
<div className="text-xs font-bold text-gray-400 tracking-widest uppercase">AVERAGE CGPA</div>
</div>
<div className="glass-card p-8 rounded-xl bg-orange-500 text-white">
<div className="text-4xl font-extrabold mb-2">850</div>
<div className="text-xs font-bold opacity-90 tracking-widest uppercase">HOURS LOGGED</div>
</div>
</div>
</div>
</main>
<footer className="bg-[#121212] border-t border-white/10">
<div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 max-w-7xl mx-auto">
<div className="mb-6 md:mb-0">
<span className="text-xs font-bold text-gray-400 uppercase tracking-widest">© 2024 SYSTEM ARCHITECT. ALL RIGHTS RESERVED.</span>
</div>
<div className="flex gap-6">
<a className="text-xs font-bold text-gray-400 hover:text-orange-500 transition-all duration-300" href={siteContent['whatsapp_link'] || "#"} target={siteContent['whatsapp_link'] ? "_blank" : "_self"} rel="noreferrer">WHATSAPP</a>
<a className="text-xs font-bold text-gray-400 hover:text-orange-500 transition-all duration-300" href={siteContent['linkedin_link'] || "#"} target={siteContent['linkedin_link'] ? "_blank" : "_self"} rel="noreferrer">LINKEDIN</a>
<a className="text-xs font-bold text-gray-400 hover:text-orange-500 transition-all duration-300" href={siteContent['instagram_link'] || "#"} target={siteContent['instagram_link'] ? "_blank" : "_self"} rel="noreferrer">INSTAGRAM</a>
<a className="text-xs font-bold text-gray-400 hover:text-orange-500 transition-all duration-300" href={siteContent['github_link'] || "#"} target={siteContent['github_link'] ? "_blank" : "_self"} rel="noreferrer">GITHUB</a>
</div>
</div>
</footer>
    </>
  );
}
