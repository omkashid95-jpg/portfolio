import SkillsSection from "@/components/SkillsSection";
import { API_BASE_URL } from '@/lib/api';
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getSiteContent() {
  try {
    const res = await fetch(`${API_BASE_URL}/content`, { cache: 'no-store' });
    if (!res.ok) return {};
    const data = await res.json();
    const contentMap: Record<string, string> = {};
    data.forEach((item: any) => {
      contentMap[item.key] = item.value;
    });
    return contentMap;
  } catch (err) {
    return {};
  }
}

async function getProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/projects/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}

async function getExperiences() {
  try {
    const res = await fetch(`${API_BASE_URL}/experience`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}

export default async function Home() {
  const content = await getSiteContent();
  const projects = await getProjects();
  const experiences = await getExperiences();
  const heroGreeting = content['hero_greeting'] || "Hey, I am";
  const heroName = content['hero_name'] || "Om";
  const heroRole = content['hero_role'] || "AI/ML Engineer / Python Developer";
  const heroDescription = content['hero_description'] || "I build high-end interactive experiences that live on the web, combining technical expertise with aesthetic design.";
  const testimonialQuote = content['testimonial_quote'] || "Om is an exceptionally talented developer. His ability to translate complex designs into functional code is remarkable.";
  const testimonialName = content['testimonial_name'] || "Suraj";
  const testimonialRole = content['testimonial_role'] || "Business Owner";
  const resumeUrl = content['resume_url'] || "#";
  const instagramLink = content['instagram_link'] || "";
  const whatsappLink = content['whatsapp_link'] || "";
  const linkedinLink = content['linkedin_link'] || "";
  const githubLink = content['github_link'] || "";

  return (
    <>
      {/* BEGIN: HeroContent */}
      <main id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#121212]">
        {/* BEGIN: AtmosphericBackground */}
        <div className="absolute inset-0 z-0" data-purpose="background-glow">
          {/* Large Orange Sunrise Glow Arc on Right */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/50 rounded-full blur-[120px]"></div>
          {/* Orbital Paths */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full"></div>
          {/* Subtle Floating Light Streaks */}
          <div className="absolute top-20 left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-orange-500/40 to-transparent rotate-45"></div>
        </div>
        {/* END: AtmosphericBackground */}

        {/* BEGIN: HeaderNavigation */}
        <Navbar resumeUrl={resumeUrl} activePath="/" />
        {/* END: HeaderNavigation */}

        <section className="relative z-10 w-full max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 pt-20">
          {/* Left Column: Copy */}
          <div className="space-y-6" data-purpose="hero-text">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-medium text-gray-300">
                {heroGreeting} <span className="text-orange-500 font-bold">{heroName}</span>
              </h2>
              <h1 className="text-6xl md:text-8xl font-extrabold leading-tight tracking-tighter">
                {heroRole.split(' ').map((word, i) => (
                  <span key={i}>
                    {word}{' '}
                    {i === 0 && <br />}
                  </span>
                ))}
              </h1>
              <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
                {heroDescription}
              </p>
            </div>
            {/* Buttons Group */}
            <div className="flex items-center gap-4">
              <a href="#connect" className="bg-[#ff4d00] inline-block text-white px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(255,77,0,0.4)] hover:scale-105 transition-transform text-center">
                Hire me
              </a>
              <button className="glass-effect p-3 rounded-full hover:bg-white/10 transition-all">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
            {/* Testimonial Card */}
            <div className="mt-12 glass-effect p-6 rounded-2xl max-w-sm relative animate-float" data-purpose="testimonial-card">
              <div className="absolute -top-4 -left-4 bg-[#ff4d00] p-2 rounded-lg shadow-lg">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.34315 15.3601 2 17.017 2H19.017C20.6738 2 22.017 3.34315 22.017 5V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91243 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H4.017C2.91243 8 2.017 7.10457 2.017 6V5C2.017 3.34315 3.36014 2 5.017 2H7.017C8.67386 2 10.017 3.34315 10.017 5V15C10.017 18.3137 7.33071 21 4.017 21H2.017Z"></path></svg>
              </div>
              <p className="text-sm text-gray-300 italic mb-4 leading-relaxed">
                "{testimonialQuote}"
              </p>
              <div className="flex items-center gap-3">
                <img alt={testimonialName} className="w-10 h-10 rounded-full border border-white/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8_zQF7OSmyXQFOVHbNWeAaQdr5i9ZCEr5w2_W6peYkf-PTrEZHU7Ba4XaxLH5RMphTjkX_n3ScijkkmvC3ej6ZCKWwuUK-eE3wsRYPMFBJZUhjpUU8_WYZkhpAM_HRB4j18ssxvUi_qz6X96-QSRqrvLesM4vEyC5EN0HITQsQPq6HLlw-IOAx3YLUJmbqNOANW3CGEUWo-wV79pclZchLeOB3eOgZ1cSdMApjjK5ZH3Kw2qMHYDnQk3DGbCtgjQ5cWi4Tr7xnkE" />
                <div>
                  <p className="text-xs font-bold text-white">{testimonialName}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{testimonialRole}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column: Character & Skills */}
          <div className="relative flex justify-center items-center h-full min-h-[500px]">
            {/* 3D Character Container */}
            <div className="relative z-20">
              <img alt="3D Developer Character" className="w-full max-w-[540px] drop-shadow-[0_20px_50px_rgba(255,77,0,0.3)] translate-x-[5%]" src="/hero-character.png" />
            </div>
            {/* Orbiting Icons */}
            <div className="absolute inset-0 pointer-events-none">
              {/* AI Icon */}
              <div className="absolute top-1/4 left-1/4 animate-orbit" style={{ animationDelay: '-2s' }}>
                <div className="glass-effect p-1.5 rounded-lg rotate-12 flex items-center justify-center w-8 h-8 group-hover:scale-110 transition-transform">
                  <span className="text-orange-500 font-extrabold text-[10px] tracking-widest">AI</span>
                </div>
              </div>
              {/* ML Icon */}
              <div className="absolute bottom-1/4 right-1/4 animate-orbit" style={{ animationDelay: '-10s' }}>
                <div className="glass-effect p-1.5 rounded-lg -rotate-6 flex items-center justify-center w-8 h-8 group-hover:scale-110 transition-transform">
                  <span className="text-blue-400 font-extrabold text-[10px] tracking-widest">ML</span>
                </div>
              </div>
              {/* PY Icon */}
              <div className="absolute top-1/2 right-0 animate-orbit" style={{ animationDelay: '-5s' }}>
                <div className="glass-effect p-1.5 rounded-lg rotate-45 flex items-center justify-center w-8 h-8 group-hover:scale-110 transition-transform">
                  <span className="text-yellow-400 font-extrabold text-[10px] tracking-widest">PY</span>
                </div>
              </div>
              {/* DATA Icon */}
              <div className="absolute top-2/3 left-0 animate-orbit" style={{ animationDelay: '-15s' }}>
                <div className="glass-effect p-1.5 rounded-lg flex items-center justify-center w-8 h-8 group-hover:scale-110 transition-transform">
                  <span className="text-emerald-400 font-extrabold text-[8px] tracking-widest">DATA</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Decorative Elements */}
        <div className="absolute bottom-10 right-10 flex gap-4 text-xs font-mono text-gray-600 uppercase tracking-widest z-50">
          <span>Scroll to explore</span>
          <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-transparent"></div>
        </div>
      </main>

      <SkillsSection />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <ConnectSection />

      <Footer
        instagramLink={instagramLink}
        whatsappLink={whatsappLink}
        linkedinLink={linkedinLink}
        githubLink={githubLink}
      />
    </>
  );
}
