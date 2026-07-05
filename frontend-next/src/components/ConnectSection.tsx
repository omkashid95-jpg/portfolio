"use client";
import { API_BASE_URL } from '@/lib/api';
import React, { useState } from 'react';

export default function ConnectSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to send message');
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="connect" className="relative py-24 px-6 md:px-12 bg-[#181818] text-white border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/30 via-[#181818]/0 to-[#181818]/0 pointer-events-none"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Let&apos;s <span className="text-orange-500">Connect</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to build something extraordinary? Drop a message and let&apos;s discuss your next project.
          </p>
        </div>

        <div className="glass-effect p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider" htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider" htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider" htmlFor="message">Message</label>
              <textarea 
                id="message" 
                rows={4} 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            {status === 'success' && (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-sm">
                Message sent successfully! I will get back to you soon.
              </div>
            )}
            
            {status === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
                Failed to send message. Please try again.
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
