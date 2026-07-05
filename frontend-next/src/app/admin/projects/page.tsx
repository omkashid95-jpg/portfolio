"use client";
import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '', description: '', technologies: '', image_url: '', source_link: '', live_link: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadProjects = async () => {
    try {
      const data = await fetchAPI('/projects/');
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetchAPI(`/projects/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await fetchAPI('/projects/', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setFormData({ title: '', description: '', technologies: '', image_url: '', source_link: '', live_link: '' });
      setEditingId(null);
      loadProjects();
    } catch (err) {
      console.error(err);
      alert('Failed to save project');
    }
  };

  const handleEdit = (proj: any) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title,
      description: proj.description,
      technologies: proj.technologies || '',
      image_url: proj.image_url || '',
      source_link: proj.source_link || '',
      live_link: proj.live_link || ''
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetchAPI(`/projects/${id}`, { method: 'DELETE' });
      loadProjects();
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-[var(--color-on-surface)]" style={{fontFamily: 'Geist, sans-serif'}}>Project Manager</h2>
      </div>

      <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] p-6">
        <h3 className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-4" style={{fontFamily: 'JetBrains Mono, monospace'}}>
          {editingId ? 'Edit Project' : 'Add New Project'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Title</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Technologies (comma separated)</label>
              <input type="text" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Description</label>
              <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Image URL</label>
              <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Source Link</label>
              <input type="text" value={formData.source_link} onChange={e => setFormData({...formData, source_link: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Live Link</label>
              <input type="text" value={formData.live_link} onChange={e => setFormData({...formData, live_link: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" />
            </div>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] px-6 py-2 rounded-lg font-bold tracking-widest uppercase text-sm" style={{fontFamily: 'JetBrains Mono, monospace'}}>
              {editingId ? 'Update' : 'Save'} Project
            </button>
            {editingId && (
              <button type="button" onClick={() => {setEditingId(null); setFormData({title: '', description: '', technologies: '', image_url: '', source_link: '', live_link: ''})}} className="bg-[var(--color-surface-variant)] text-[var(--color-on-surface)] px-6 py-2 rounded-lg font-bold tracking-widest uppercase text-sm" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--color-surface-variant)] border-b border-[var(--color-outline-variant)]">
              <th className="p-4 text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)]" style={{fontFamily: 'JetBrains Mono, monospace'}}>Project</th>
              <th className="p-4 text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)]" style={{fontFamily: 'JetBrains Mono, monospace'}}>Tech</th>
              <th className="p-4 text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] text-right" style={{fontFamily: 'JetBrains Mono, monospace'}}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-outline-variant)]">
            {loading ? <tr><td colSpan={3} className="p-4 text-center">Loading...</td></tr> : 
             projects.length === 0 ? <tr><td colSpan={3} className="p-4 text-center">No projects found.</td></tr> :
             projects.map((proj: any) => (
              <tr key={proj.id} className="hover:bg-[var(--color-surface-variant)]/50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-[var(--color-on-surface)]">{proj.title}</div>
                  <div className="text-sm text-[var(--color-on-surface-variant)] truncate max-w-xs">{proj.description}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-[var(--color-on-surface-variant)]">{proj.technologies}</div>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleEdit(proj)} className="p-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded hover:bg-[var(--color-primary)]/20 transition-colors">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button onClick={() => handleDelete(proj.id)} className="p-2 bg-[var(--color-error)]/10 text-[var(--color-error)] rounded hover:bg-[var(--color-error)]/20 transition-colors">
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
