"use client";
import { API_BASE_URL, BASE_URL } from '@/lib/api';
import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';

const LANDING_PAGE_KEYS = [
  { key: 'hero_greeting', label: 'Hero Greeting', default: 'Hey, I am', type: 'text' },
  { key: 'hero_name', label: 'Hero Name', default: 'Om', type: 'text' },
  { key: 'hero_role', label: 'Hero Role', default: 'AI/ML & Python Developer', type: 'text' },
  { key: 'hero_description', label: 'Hero Description', default: 'I build high-end interactive experiences that live on the web, combining technical expertise with aesthetic design.', type: 'textarea' },
  { key: 'testimonial_quote', label: 'Testimonial Quote', default: 'Om is an exceptionally talented developer. His ability to translate complex designs into functional code is remarkable.', type: 'textarea' },
  { key: 'testimonial_name', label: 'Testimonial Name', default: 'Suraj', type: 'text' },
  { key: 'testimonial_role', label: 'Testimonial Role', default: 'Business Owner', type: 'text' },
];

const SOCIAL_KEYS = [
  { key: 'instagram_link', label: 'Instagram Link', default: '', type: 'text' },
  { key: 'whatsapp_link', label: 'WhatsApp Link', default: '', type: 'text' },
  { key: 'linkedin_link', label: 'LinkedIn Link', default: '', type: 'text' },
  { key: 'github_link', label: 'GitHub Link', default: '', type: 'text' },
];


export default function SettingsAdminPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadContent = async () => {
    try {
      const data = await fetchAPI('/content');
      const contentMap: Record<string, string> = {};
      data.forEach((item: any) => {
        contentMap[item.key] = item.value;
      });
      setContent(contentMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Save all keys one by one (or you could create a bulk update endpoint, but this works)
      await Promise.all(
        Object.entries(content).map(([key, value]) =>
          fetchAPI('/content', {
            method: 'POST',
            body: JSON.stringify({ key, value }),
          })
        )
      );
      alert('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch(`${API_BASE_URL}/upload?file_type=resume`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: formData,
      });
      
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      // Update the resume_url content in the local state
      setContent(prev => ({ ...prev, 'resume_url': `${BASE_URL}${data.file_url}` }));
      alert('Resume uploaded successfully! Click Save Changes to apply.');
    } catch (err) {
      console.error(err);
      alert('Failed to upload resume');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-[var(--color-on-surface)]" style={{fontFamily: 'Geist, sans-serif'}}>Site Content & Settings</h2>
      </div>

      <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] p-6">
        <h3 className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-6" style={{fontFamily: 'JetBrains Mono, monospace'}}>
          Landing Page Content
        </h3>
        
        {loading ? (
          <div className="text-[var(--color-on-surface-variant)] p-4 text-center">Loading...</div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LANDING_PAGE_KEYS.map((field) => (
                <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea 
                      rows={4}
                      value={content[field.key] !== undefined ? content[field.key] : field.default}
                      onChange={e => handleChange(field.key, e.target.value)} 
                      className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-3 text-[var(--color-on-surface)] focus:border-[var(--color-primary)] outline-none transition-colors" 
                    />
                  ) : (
                    <input 
                      type="text" 
                      value={content[field.key] !== undefined ? content[field.key] : field.default}
                      onChange={e => handleChange(field.key, e.target.value)} 
                      className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-3 text-[var(--color-on-surface)] focus:border-[var(--color-primary)] outline-none transition-colors" 
                    />
                  )}
                </div>
              ))}
              
              <div className="md:col-span-2 mt-8 mb-4">
                <h3 className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                  Social Media Links
                </h3>
                <div className="h-px w-full bg-[var(--color-outline-variant)]"></div>
              </div>

              {SOCIAL_KEYS.map((field) => (
                <div key={field.key} className="">
                  <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                    {field.label}
                  </label>
                  <input 
                    type="url" 
                    value={content[field.key] !== undefined ? content[field.key] : field.default}
                    onChange={e => handleChange(field.key, e.target.value)} 
                    placeholder="https://"
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-3 text-[var(--color-on-surface)] focus:border-[var(--color-primary)] outline-none transition-colors" 
                  />
                </div>
              ))}

              <div className="md:col-span-2 mt-8 mb-4">
                <h3 className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                  Files & Attachments
                </h3>
                <div className="h-px w-full bg-[var(--color-outline-variant)]"></div>
              </div>
              
              {/* Resume Upload Section */}
              <div className="md:col-span-2">
                <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                  Upload Resume (PDF)
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-orange/10 file:text-brand-orange hover:file:bg-brand-orange/20 cursor-pointer"
                  />
                  {content['resume_url'] && (
                    <a href={content['resume_url']} target="_blank" rel="noreferrer" className="text-sm text-brand-orange hover:underline whitespace-nowrap">
                      View Current
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-[var(--color-outline-variant)] flex justify-end">
              <button 
                type="submit" 
                disabled={saving}
                className="bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] px-8 py-3 rounded-lg font-bold tracking-widest uppercase text-sm disabled:opacity-50 transition-opacity flex items-center gap-2" 
                style={{fontFamily: 'JetBrains Mono, monospace'}}
              >
                {saving ? (
                  <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                ) : (
                  <span className="material-symbols-outlined text-sm">save</span>
                )}
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
