"use client";
import React, { useState, useEffect } from 'react';

import { fetchAPI } from '@/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, uptime: '99.98', apiHits: '42.5' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, skills] = await Promise.all([
          fetchAPI('/projects/'),
          fetchAPI('/skills')
        ]);
        setStats(prev => ({ ...prev, projects: projects.length, skills: skills.length }));
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      {/* Quick Stats / Metric Cards (Bento Grid Style) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-[var(--color-surface-container)] p-6 rounded-xl border border-[var(--color-outline-variant)] relative overflow-hidden group hover:border-[var(--color-primary)] transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg text-[var(--color-primary)]">
              <span className="material-symbols-outlined">stack</span>
            </div>
            <span className="text-emerald-500 text-[14px] flex items-center gap-1" style={{fontFamily: 'JetBrains Mono, monospace'}}>
              +12% <span className="material-symbols-outlined text-xs">trending_up</span>
            </span>
          </div>
          <div className="text-[48px] leading-tight font-bold text-[var(--color-on-surface)] mb-1 tracking-tighter" style={{fontFamily: 'Geist, sans-serif'}}>{stats.projects}</div>
          <div className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)]" style={{fontFamily: 'JetBrains Mono, monospace'}}>Total Active Projects</div>
        </div>

        {/* Card 2 */}
        <div className="bg-[var(--color-surface-container)] p-6 rounded-xl border border-[var(--color-outline-variant)] relative overflow-hidden group hover:border-[var(--color-primary)] transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[var(--color-tertiary)]/10 rounded-lg text-[var(--color-tertiary)]">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <span className="text-emerald-500 text-[14px] flex items-center gap-1" style={{fontFamily: 'JetBrains Mono, monospace'}}>Stable</span>
          </div>
          <div className="text-[48px] leading-tight font-bold text-[var(--color-on-surface)] mb-1 tracking-tighter" style={{fontFamily: 'Geist, sans-serif'}}>{stats.uptime}<span className="text-[30px]">%</span></div>
          <div className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)]" style={{fontFamily: 'JetBrains Mono, monospace'}}>System Uptime (24h)</div>
        </div>

        {/* Card 3 */}
        <div className="bg-[var(--color-surface-container)] p-6 rounded-xl border border-[var(--color-outline-variant)] relative overflow-hidden group hover:border-[var(--color-primary)] transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[var(--color-secondary)]/10 rounded-lg text-[var(--color-secondary)]">
              <span className="material-symbols-outlined">api</span>
            </div>
            <span className="text-[var(--color-on-surface-variant)] text-[14px]" style={{fontFamily: 'JetBrains Mono, monospace'}}>8.2M total</span>
          </div>
          <div className="text-[48px] leading-tight font-bold text-[var(--color-on-surface)] mb-1 tracking-tighter" style={{fontFamily: 'Geist, sans-serif'}}>{stats.apiHits}<span className="text-[30px]">k</span></div>
          <div className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)]" style={{fontFamily: 'JetBrains Mono, monospace'}}>API Hits / Hour</div>
        </div>

        {/* Card 4 */}
        <div className="bg-[var(--color-surface-container)] p-6 rounded-xl border border-[var(--color-outline-variant)] relative overflow-hidden group hover:border-[var(--color-primary)] transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[var(--color-error)]/10 rounded-lg text-[var(--color-error)]">
              <span className="material-symbols-outlined">memory</span>
            </div>
            <span className="text-[var(--color-error)] text-[14px]" style={{fontFamily: 'JetBrains Mono, monospace'}}>High Load</span>
          </div>
          <div className="text-[48px] leading-tight font-bold text-[var(--color-on-surface)] mb-1 tracking-tighter" style={{fontFamily: 'Geist, sans-serif'}}>76<span className="text-[30px]">%</span></div>
          <div className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)]" style={{fontFamily: 'JetBrains Mono, monospace'}}>ML Compute Usage</div>
        </div>
      </section>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity (Asymmetric Layout) */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[30px] font-bold text-[var(--color-on-surface)]" style={{fontFamily: 'Geist, sans-serif'}}>Recent Activity</h2>
            <button className="text-[var(--color-primary)] text-[12px] font-bold tracking-widest uppercase hover:underline transition-all" style={{fontFamily: 'JetBrains Mono, monospace'}}>View All History</button>
          </div>
          <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] overflow-hidden">
            <div className="divide-y divide-[var(--color-outline-variant)]">
              {/* Item 1 */}
              <div className="p-4 flex items-center gap-4 hover:bg-[var(--color-surface-variant)]/50 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-variant)] flex items-center justify-center text-[var(--color-primary)] border border-[var(--color-outline-variant)] group-hover:border-[var(--color-primary)] transition-colors">
                  <span className="material-symbols-outlined">terminal</span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-[var(--color-on-surface)]">Updated 'FastAPI Project X'</h4>
                    <span className="text-[var(--color-on-surface-variant)] text-[10px]" style={{fontFamily: 'JetBrains Mono, monospace'}}>2m ago</span>
                  </div>
                  <p className="text-[var(--color-on-surface-variant)] text-sm">Deployed v2.4.1 to production-edge-01</p>
                </div>
                <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded text-[10px]" style={{fontFamily: 'JetBrains Mono, monospace'}}>SUCCESS</div>
              </div>
              {/* Item 2 */}
              <div className="p-4 flex items-center gap-4 hover:bg-[var(--color-surface-variant)]/50 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-variant)] flex items-center justify-center text-[var(--color-tertiary)] border border-[var(--color-outline-variant)] group-hover:border-[var(--color-tertiary)] transition-colors">
                  <span className="material-symbols-outlined">database</span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-[var(--color-on-surface)]">Vector DB Indexing</h4>
                    <span className="text-[var(--color-on-surface-variant)] text-[10px]" style={{fontFamily: 'JetBrains Mono, monospace'}}>14m ago</span>
                  </div>
                  <p className="text-[var(--color-on-surface-variant)] text-sm">Rebuilding similarity index for 'AI-Chat-Model'</p>
                </div>
                <div className="px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded text-[10px]" style={{fontFamily: 'JetBrains Mono, monospace'}}>RUNNING</div>
              </div>
              {/* Item 3 */}
              <div className="p-4 flex items-center gap-4 hover:bg-[var(--color-surface-variant)]/50 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-variant)] flex items-center justify-center text-[var(--color-secondary)] border border-[var(--color-outline-variant)] group-hover:border-[var(--color-secondary)] transition-colors">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-[var(--color-on-surface)]">API Key Rotated</h4>
                    <span className="text-[var(--color-on-surface-variant)] text-[10px]" style={{fontFamily: 'JetBrains Mono, monospace'}}>1h ago</span>
                  </div>
                  <p className="text-[var(--color-on-surface-variant)] text-sm">System-wide rotation for 'Legacy-Integrator'</p>
                </div>
                <div className="px-2 py-1 bg-[var(--color-outline-variant)]/30 text-[var(--color-outline)] rounded text-[10px]" style={{fontFamily: 'JetBrains Mono, monospace'}}>ARCHIVED</div>
              </div>
            </div>
            <div className="p-4 bg-[var(--color-surface-container-high)]/50 border-t border-[var(--color-outline-variant)] text-center">
              <button className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-outline)] hover:text-[var(--color-on-surface)] transition-colors flex items-center justify-center w-full gap-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                <span className="material-symbols-outlined text-sm">expand_more</span>
                Show 10 More
              </button>
            </div>
          </div>
        </section>

        {/* System Health Side Panel (Bento Sidebar) */}
        <section className="space-y-6">
          <div className="bg-[var(--color-surface-container-high)] rounded-xl border border-[var(--color-outline-variant)] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface)]" style={{fontFamily: 'JetBrains Mono, monospace'}}>Nodes Status</h3>
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            </div>
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-[14px] text-[var(--color-on-surface-variant)]" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                  <span>Primary Cluster (US-East)</span>
                  <span>24/24</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--color-surface-variant)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-primary)] w-full transition-all duration-1000"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[14px] text-[var(--color-on-surface-variant)]" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                  <span>Edge Cache (EU-West)</span>
                  <span>18/18</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--color-surface-variant)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-primary)] w-full transition-all duration-1000"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[14px] text-[var(--color-on-surface-variant)]" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                  <span>Replica Set (AP-South)</span>
                  <span>11/12</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--color-surface-variant)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-tertiary)] w-[91%] transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Compute Pulse */}
          <div className="relative h-48 rounded-xl border border-[var(--color-outline-variant)] overflow-hidden bg-[var(--color-surface-container-lowest)]">
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-[var(--color-surface-container-lowest)] via-transparent">
              <div className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-primary)] mb-1" style={{fontFamily: 'JetBrains Mono, monospace'}}>Compute Real-time</div>
              <div className="flex items-end gap-1">
                <div className="text-[48px] leading-none font-bold tracking-tighter" style={{fontFamily: 'Geist, sans-serif'}}>1.2</div>
                <div className="text-[30px] pb-1 font-semibold text-[var(--color-on-surface-variant)] tracking-tighter" style={{fontFamily: 'Geist, sans-serif'}}>PFLOPS</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
