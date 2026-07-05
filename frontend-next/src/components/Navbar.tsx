"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar({ resumeUrl, activePath = '/' }: { resumeUrl: string, activePath?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Education', path: '/education' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Connect', path: '/#connect' },
  ];

  return (
    <header className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 max-w-7xl mx-auto md:left-1/2 md:-translate-x-1/2">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-tight text-white z-50">Om<span className="text-orange-500"> !</span></div>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden z-50 text-white p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
        {navLinks.map((link) => {
          const isActive = activePath === link.path || (activePath === '/' && link.path === '/#home');
          return (
            <Link 
              key={link.name}
              href={link.path}
              className={`hover:text-white transition-colors ${isActive ? 'text-white border-b-2 border-orange-500 pb-1' : ''}`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Desktop Resume Button */}
      <a href={resumeUrl} target="_blank" rel="noreferrer" className="hidden md:flex glass-effect px-5 py-2 rounded-full items-center gap-2 text-sm font-medium text-white hover:bg-white/10 transition-all border border-white/20">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Resume
      </a>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[#121212]/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden z-40 fixed">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-medium text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a 
            href={resumeUrl} 
            target="_blank" 
            rel="noreferrer" 
            onClick={() => setIsOpen(false)}
            className="bg-[#ff4d00] px-8 py-3 rounded-full flex items-center gap-2 text-white font-bold mt-8 shadow-[0_0_20px_rgba(255,77,0,0.4)]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
}
