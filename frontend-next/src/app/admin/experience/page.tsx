"use client";
import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';

export default function ExperienceAdminPage() {
  const [experienceList, setExperienceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '', technology: '', experience_type: '', duration: '', description: '', key_skills: '', outcome: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadExperience = async () => {
    try {
      const data = await fetchAPI('/experience');
      setExperienceList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperience();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetchAPI(`/experience/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await fetchAPI('/experience', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setFormData({ title: '', technology: '', experience_type: '', duration: '', description: '', key_skills: '', outcome: '' });
      setEditingId(null);
      loadExperience();
    } catch (err) {
      console.error(err);
      alert('Failed to save experience details');
    }
  };

  const handleEdit = (exp: any) => {
    setEditingId(exp.id);
    setFormData({
      title: exp.title || '',
      technology: exp.technology || '',
      experience_type: exp.experience_type || '',
      duration: exp.duration || '',
      description: exp.description || '',
      key_skills: exp.key_skills || '',
      outcome: exp.outcome || ''
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this experience record?')) return;
    try {
      await fetchAPI(`/experience/${id}`, { method: 'DELETE' });
      loadExperience();
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-[var(--color-on-surface)]" style={{fontFamily: 'Geist, sans-serif'}}>Experience Manager</h2>
      </div>

      <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] p-6">
        <h3 className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-4" style={{fontFamily: 'JetBrains Mono, monospace'}}>
          {editingId ? 'Edit Experience' : 'Add New Experience'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Title</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. Hands-on Experience" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Technology / Skill</label>
              <input type="text" value={formData.technology} onChange={e => setFormData({...formData, technology: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. Python, FastAPI, SQL, Pandas" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Experience Type</label>
              <input type="text" value={formData.experience_type} onChange={e => setFormData({...formData, experience_type: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. Academic Project / Personal Project" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Duration</label>
              <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. Jan 2026 - Present" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Key Skills Used</label>
              <input type="text" value={formData.key_skills} onChange={e => setFormData({...formData, key_skills: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. FastAPI, JWT, PostgreSQL" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Description</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={2} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="2-3 lines about what was built..."></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Outcome / Achievement</label>
              <textarea value={formData.outcome} onChange={e => setFormData({...formData, outcome: e.target.value})} rows={2} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. REST APIs developed, ML models trained"></textarea>
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button type="submit" className="bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] px-6 py-2 rounded-lg font-bold text-sm tracking-widest uppercase" style={{fontFamily: 'JetBrains Mono, monospace'}}>
              {editingId ? 'Update' : 'Save'} Experience
            </button>
            {editingId && (
              <button type="button" onClick={() => {setEditingId(null); setFormData({ title: '', technology: '', experience_type: '', duration: '', description: '', key_skills: '', outcome: '' });}} className="bg-[var(--color-surface)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] px-6 py-2 rounded-lg font-bold text-sm tracking-widest uppercase" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-[var(--color-on-surface-variant)]">Loading...</div>
        ) : experienceList.map((exp: any) => (
          <div key={exp.id} className="bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-xl overflow-hidden flex flex-col p-6">
            <h4 className="text-lg font-bold text-[var(--color-on-surface)] mb-1">{exp.title}</h4>
            <p className="text-sm text-[var(--color-primary)] mb-2">{exp.experience_type}</p>
            <p className="text-[12px] text-[var(--color-on-surface-variant)] mb-2 font-mono">{exp.duration}</p>
            
            <p className="text-[12px] text-[var(--color-on-surface)] mb-2"><strong>Tech:</strong> {exp.technology}</p>
            
            {exp.description && (
               <p className="text-sm text-[var(--color-on-surface-variant)] mb-2 line-clamp-2">{exp.description}</p>
            )}

            {exp.key_skills && (
               <p className="text-[12px] text-[var(--color-on-surface-variant)] mb-2"><strong>Skills:</strong> {exp.key_skills}</p>
            )}

            {exp.outcome && (
               <p className="text-sm text-[var(--color-on-surface)] mb-4 italic line-clamp-2">{exp.outcome}</p>
            )}
            
            <div className="mt-auto flex justify-between items-center pt-4 border-t border-[var(--color-outline-variant)]">
              <button onClick={() => handleEdit(exp)} className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                <span className="material-symbols-outlined text-sm">edit</span> Edit
              </button>
              <button onClick={() => handleDelete(exp.id)} className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-error)] hover:text-[var(--color-error-container)] transition-colors flex items-center gap-1" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                <span className="material-symbols-outlined text-sm">delete</span> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
