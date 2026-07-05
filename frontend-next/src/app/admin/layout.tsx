"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getAuthToken, logout } from '@/lib/api';
import Footer from '@/components/Footer';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else if (token) {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <div className="bg-[var(--color-surface)] text-[var(--color-on-surface)] min-h-screen flex items-center justify-center font-[family-name:var(--font-sans)]">
        {children}
      </div>
    );
  }

  if (!isAuthenticated && !isLoginPage) {
    return null; // Don't render until redirect
  }

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-on-surface)] selection:bg-[var(--color-primary)]/30 selection:text-[var(--color-primary)] min-h-screen flex flex-col font-[family-name:var(--font-sans)]">
      {/* Navigation Drawer (SideNav) */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[var(--color-surface-container)] border-r border-[var(--color-outline-variant)] flex flex-col p-4 z-50">
        <div className="mb-8 px-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-primary)] text-2xl">terminal</span>
            <h1 className="text-[var(--color-primary)] font-bold text-3xl tracking-tighter" style={{ fontFamily: 'Geist, sans-serif' }}>DevEngine</h1>
          </div>
          <div className="mt-1 text-[var(--color-outline)] font-bold text-[10px] tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>v4.2.0-stable</div>
        </div>

        <nav className="flex-grow space-y-1">
          {[
            { href: '/admin', icon: 'dashboard', label: 'System Health', exact: true },
            { href: '/admin/projects', icon: 'dataset', label: 'Project CRUD' },
            { href: '/admin/content', icon: 'edit_note', label: 'Content Engine' },
            { href: '/admin/settings', icon: 'settings', label: 'Settings' },
            { href: '/admin/messages', icon: 'mail', label: 'Messages' },
            { href: '/admin/certifications', icon: 'workspace_premium', label: 'Add Certificate Details' },
            { href: '/admin/education', icon: 'school', label: 'Add Education Details' },
            { href: '/admin/experience', icon: 'work', label: 'Add Experience Details' }
          ].map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-2 transition-all duration-100 active:scale-95 rounded-lg ${isActive
                    ? 'bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] font-bold'
                    : 'text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]'
                  }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-[12px] font-bold tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-[var(--color-outline-variant)] pb-4">
          <div className="flex items-center gap-4 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-surface-variant)] flex items-center justify-center overflow-hidden border border-[var(--color-outline-variant)]">
              <span className="material-symbols-outlined text-[var(--color-on-surface)]">person</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-widest uppercase text-[var(--color-on-surface)] text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Lead Architect</span>
              <span className="text-[var(--color-on-surface-variant)] text-[11px]">Admin User</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-all rounded-lg"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span className="text-[12px] font-bold tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-grow flex flex-col min-h-screen">
        {/* TopAppBar */}
        <header className="bg-[var(--color-surface)] border-b border-[var(--color-outline-variant)] sticky top-0 z-40 h-16">
          <div className="flex justify-between items-center w-full px-6 max-w-[1280px] mx-auto h-full">
            <div className="flex items-center gap-4">
              <span className="text-[30px] font-semibold text-[var(--color-primary)] tracking-tighter" style={{ fontFamily: 'Geist, sans-serif' }}>System Overview</span>
              <div className="hidden md:flex items-center gap-6 ml-8">
                <a className="text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] pb-1 text-[12px] font-bold tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }} href="#">Dashboard</a>
                <a className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors duration-200 text-[12px] font-bold tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }} href="#">Logs</a>
                <a className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors duration-200 text-[12px] font-bold tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }} href="#">Infrastructure</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <span className="material-symbols-outlined text-[var(--color-on-surface-variant)] cursor-pointer hover:text-[var(--color-primary)] transition-colors">notifications</span>
                <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-error)] rounded-full border border-[var(--color-surface)]"></div>
              </div>
              <button className="bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <span className="material-symbols-outlined text-sm">add</span>
                New Deployment
              </button>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="p-6 max-w-[1280px] mx-auto w-full space-y-6">
          {children}
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
