"use client";
import { API_BASE_URL } from '@/lib/api';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAuthToken, API_BASE_URL } from '@/lib/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      setAuthToken(data.access_token);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[var(--color-surface-container)] p-8 rounded-xl border border-[var(--color-outline-variant)] w-full max-w-md shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-tertiary)]"></div>
      
      <div className="flex items-center gap-2 mb-8 justify-center">
        <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">terminal</span>
        <h1 className="text-[var(--color-primary)] font-bold text-4xl tracking-tighter" style={{fontFamily: 'Geist, sans-serif'}}>DevEngine</h1>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Username</label>
          <input 
            type="text" 
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-3 text-[var(--color-on-surface)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
            required 
          />
        </div>
        <div>
          <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-3 text-[var(--color-on-surface)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
            required 
          />
        </div>

        {error && (
          <div className="bg-[var(--color-error)]/10 text-[var(--color-error)] p-3 rounded-lg text-sm border border-[var(--color-error)]/20">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] py-3 rounded-lg font-bold tracking-widest uppercase text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center gap-2"
          style={{fontFamily: 'JetBrains Mono, monospace'}}
        >
          {isLoading ? (
            <span className="material-symbols-outlined animate-spin">sync</span>
          ) : (
            <span className="material-symbols-outlined">login</span>
          )}
          Access System
        </button>
      </form>
    </div>
  );
}
