"use client";
import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      const data = await fetchAPI('/contact');
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-[var(--color-on-surface)]" style={{fontFamily: 'Geist, sans-serif'}}>Contact Messages</h2>
        <button 
          onClick={loadMessages}
          className="bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] px-4 py-2 rounded-lg font-bold tracking-widest uppercase text-xs hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          Refresh
        </button>
      </div>

      <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[var(--color-on-surface-variant)]">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-[var(--color-on-surface-variant)]">
            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">inbox</span>
            <p>No messages found.</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-outline-variant)]">
            {messages.map((msg) => (
              <div key={msg.id} className="p-6 hover:bg-[var(--color-surface-variant)]/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <span className="font-bold text-[var(--color-on-surface)]">{msg.name}</span>
                    <a href={`mailto:${msg.email}`} className="text-sm text-[var(--color-primary)] hover:underline">{msg.email}</a>
                  </div>
                  <span className="text-xs text-[var(--color-outline)] font-bold tracking-widest uppercase" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-[var(--color-on-surface-variant)] text-sm whitespace-pre-wrap mt-4 bg-[var(--color-surface)] p-4 rounded-lg border border-[var(--color-outline-variant)]">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
