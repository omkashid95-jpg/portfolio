"use client";
import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', category: '', proficiency: 50
  });

  const loadSkills = async () => {
    try {
      const data = await fetchAPI('/skills');
      setSkills(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchAPI('/skills', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setFormData({ name: '', category: '', proficiency: 50 });
      loadSkills();
    } catch (err) {
      console.error(err);
      alert('Failed to save skill');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await fetchAPI(`/skills/${id}`, { method: 'DELETE' });
      loadSkills();
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-[var(--color-on-surface)]" style={{fontFamily: 'Geist, sans-serif'}}>Skills Manager</h2>
      </div>

      <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] p-6">
        <h3 className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-4" style={{fontFamily: 'JetBrains Mono, monospace'}}>
          Add New Skill
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Skill Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. React" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Category</label>
              <input type="text" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. Frontend" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Proficiency (1-100)</label>
              <input type="number" min="1" max="100" required value={formData.proficiency} onChange={e => setFormData({...formData, proficiency: parseInt(e.target.value)})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" />
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <button type="submit" className="bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] px-6 py-2 rounded-lg font-bold tracking-widest uppercase text-sm" style={{fontFamily: 'JetBrains Mono, monospace'}}>
              Save Skill
            </button>
          </div>
        </form>
      </div>

      <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--color-surface-variant)] border-b border-[var(--color-outline-variant)]">
              <th className="p-4 text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)]" style={{fontFamily: 'JetBrains Mono, monospace'}}>Skill</th>
              <th className="p-4 text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)]" style={{fontFamily: 'JetBrains Mono, monospace'}}>Category</th>
              <th className="p-4 text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)]" style={{fontFamily: 'JetBrains Mono, monospace'}}>Proficiency</th>
              <th className="p-4 text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] text-right" style={{fontFamily: 'JetBrains Mono, monospace'}}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-outline-variant)]">
            {loading ? <tr><td colSpan={4} className="p-4 text-center">Loading...</td></tr> : 
             skills.length === 0 ? <tr><td colSpan={4} className="p-4 text-center">No skills found.</td></tr> :
             skills.map((skill: any) => (
              <tr key={skill.id} className="hover:bg-[var(--color-surface-variant)]/50 transition-colors">
                <td className="p-4 font-bold text-[var(--color-on-surface)]">{skill.name}</td>
                <td className="p-4 text-sm text-[var(--color-on-surface-variant)]">{skill.category}</td>
                <td className="p-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-[var(--color-surface)] h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--color-primary)] rounded-full" style={{width: `${skill.proficiency}%`}}></div>
                    </div>
                    <span className="text-[var(--color-on-surface-variant)]">{skill.proficiency}%</span>
                  </div>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleDelete(skill.id)} className="p-2 bg-[var(--color-error)]/10 text-[var(--color-error)] rounded hover:bg-[var(--color-error)]/20 transition-colors">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
