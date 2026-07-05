"use client";
import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';

export default function EducationAdminPage() {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    degree: '', institution: '', start_date: '', end_date: '', description: '', cgpa: '', percentage: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadEducation = async () => {
    try {
      const data = await fetchAPI('/education');
      setEducationList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEducation();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetchAPI(`/education/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await fetchAPI('/education', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setFormData({ degree: '', institution: '', start_date: '', end_date: '', description: '', cgpa: '', percentage: '' });
      setEditingId(null);
      loadEducation();
    } catch (err) {
      console.error(err);
      alert('Failed to save education details');
    }
  };

  const handleEdit = (edu: any) => {
    setEditingId(edu.id);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      start_date: edu.start_date || '',
      end_date: edu.end_date || '',
      description: edu.description || '',
      cgpa: edu.cgpa || '',
      percentage: edu.percentage || ''
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this education record?')) return;
    try {
      await fetchAPI(`/education/${id}`, { method: 'DELETE' });
      loadEducation();
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-[var(--color-on-surface)]" style={{fontFamily: 'Geist, sans-serif'}}>Education Manager</h2>
      </div>

      <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] p-6">
        <h3 className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-4" style={{fontFamily: 'JetBrains Mono, monospace'}}>
          {editingId ? 'Edit Education' : 'Add New Education'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Degree / Title</label>
              <input type="text" required value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. Bachelor of Engineering" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Institution</label>
              <input type="text" required value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Start Date</label>
              <input type="text" value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. 2016" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>End Date (or Present)</label>
              <input type="text" value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. 2020" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>CGPA (Optional)</label>
              <input type="text" value={formData.cgpa} onChange={e => setFormData({...formData, cgpa: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. 8.5" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Percentage (Optional)</label>
              <input type="text" value={formData.percentage} onChange={e => setFormData({...formData, percentage: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. 85%" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Description (Optional)</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="Details about coursework, thesis, or honors..."></textarea>
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button type="submit" className="bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] px-6 py-2 rounded-lg font-bold text-sm tracking-widest uppercase" style={{fontFamily: 'JetBrains Mono, monospace'}}>
              {editingId ? 'Update' : 'Save'} Education
            </button>
            {editingId && (
              <button type="button" onClick={() => {setEditingId(null); setFormData({ degree: '', institution: '', start_date: '', end_date: '', description: '', cgpa: '', percentage: '' });}} className="bg-[var(--color-surface)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] px-6 py-2 rounded-lg font-bold text-sm tracking-widest uppercase" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-[var(--color-on-surface-variant)]">Loading...</div>
        ) : educationList.map((edu: any) => (
          <div key={edu.id} className="bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-xl overflow-hidden flex flex-col p-6">
            <h4 className="text-lg font-bold text-[var(--color-on-surface)] mb-1">{edu.degree}</h4>
            <p className="text-sm text-[var(--color-primary)] mb-2">{edu.institution}</p>
            <p className="text-[12px] text-[var(--color-on-surface-variant)] mb-4 font-mono">{edu.start_date} - {edu.end_date}</p>
            {(edu.cgpa || edu.percentage) && (
              <p className="text-[12px] text-[var(--color-primary)] mb-2 font-mono">
                {edu.cgpa && `CGPA: ${edu.cgpa}`} {edu.cgpa && edu.percentage && '|'} {edu.percentage && `Percentage: ${edu.percentage}`}
              </p>
            )}
            {edu.description && (
               <p className="text-sm text-[var(--color-on-surface-variant)] mb-4 line-clamp-3">{edu.description}</p>
            )}
            
            <div className="mt-auto flex justify-between items-center pt-4 border-t border-[var(--color-outline-variant)]">
              <button onClick={() => handleEdit(edu)} className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                <span className="material-symbols-outlined text-sm">edit</span> Edit
              </button>
              <button onClick={() => handleDelete(edu.id)} className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-error)] hover:text-[var(--color-error-container)] transition-colors flex items-center gap-1" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                <span className="material-symbols-outlined text-sm">delete</span> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
