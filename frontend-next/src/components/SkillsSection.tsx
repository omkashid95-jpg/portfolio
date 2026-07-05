"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from '@/lib/api';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

const skillImages: Record<string, string> = {
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "SASS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "React JS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "Node JS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "MySql": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "FastAPI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  "RESTAPIs": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Backend Development": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  "Scikit-learn": "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
  "Pandas": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  "Numpy": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  "Generative AI (GenAI)": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "Prompt Engineering": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "LLM Applications": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "LlamaIndex": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "OpenAI API": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "Google Gemini API": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
  "Vector Embeddings": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "RAG": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "Git & GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "Microsoft Excel": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg",
  "Microsoft Power Point": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg",
  "Problem solving": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg",
  "Critical Thinking": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg",
  "Communication": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg",
  "N8N": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
  "Zapper": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
  "Linux": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  "LangChain": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "LangGraph": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "EDA": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "Feature Engineering": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
};

const defaultIcon = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"; // Default to GitHub icon shape

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/skills/`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch skills:", err);
        setLoading(false);
      });
  }, []);

  const getSkillImage = (name: string) => {
    // Try exact match
    if (skillImages[name]) return skillImages[name];
    // Try case-insensitive match
    const key = Object.keys(skillImages).find(k => k.toLowerCase() === name.toLowerCase());
    return key ? skillImages[key] : defaultIcon;
  };

  return (
    <section id="skills" className="relative min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden bg-[#121212]">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/40 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row gap-8 items-stretch pt-20 pb-20">
        {/* BEGIN: SidebarLabel */}
        <aside className="hidden md:flex items-center justify-center" data-purpose="vertical-sidebar">
          <div className="flex items-center gap-4">
            <span className="vertical-text text-3xl font-bold uppercase tracking-widest text-white">Skills</span>
            <div className="w-1.5 h-24 bg-orange-500 rounded-full"></div>
          </div>
        </aside>
        {/* END: SidebarLabel */}
        
        {/* BEGIN: ContentArea */}
        <div className="flex-1 flex flex-col">
          {/* BEGIN: HeaderSection */}
          <header className="text-center md:text-left mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tighter">What I do</h1>
            <p className="max-w-2xl text-gray-400 text-sm md:text-base leading-relaxed mx-auto md:mx-0">
              I am a passionate Software Engineer specializing in Backend Development, Machine Learning, and Generative AI. With expertise in building scalable APIs and integrating advanced LLMs, I leverage modern technologies to solve complex problems and deliver impactful solutions.
            </p>
          </header>
          {/* END: HeaderSection */}
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4" data-purpose="skills-grid">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <button 
                    key={skill.id} 
                    className="glass-effect flex flex-col items-center justify-center p-3 rounded-xl aspect-square cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,77,0,0.3)] transition-all duration-300 group" 
                    data-purpose="skill-card"
                    title={`${skill.name} - ${skill.proficiency}% Proficiency`}
                    onClick={() => alert(`Selected Skill: ${skill.name} (${skill.proficiency}%)`)}
                  >
                    <img 
                      alt={skill.name} 
                      className="w-10 h-10 mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_10px_rgba(255,77,0,0.4)] transition-all" 
                      src={getSkillImage(skill.name)}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300 text-center leading-tight group-hover:text-white transition-colors">{skill.name}</span>
                    <span className="text-[9px] text-orange-500 font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{skill.proficiency}%</span>
                  </button>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No skills found in the database. Add some from the admin panel!
                </div>
              )}
            </div>
          )}
        </div>
        {/* END: ContentArea */}
      </div>
    </section>
  );
}
