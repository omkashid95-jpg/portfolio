"use client";
import { API_BASE_URL, BASE_URL } from '@/lib/api';
import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';

export default function CertificationsAdminPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '', issuer: '', date_issued: '', credential_url: '', image_url: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  const loadCertificates = async () => {
    try {
      const data = await fetchAPI('/certificates');
      setCertificates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetchAPI(`/certificates/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await fetchAPI('/certificates', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setFormData({ title: '', issuer: '', date_issued: '', credential_url: '', image_url: '' });
      setEditingId(null);
      loadCertificates();
    } catch (err) {
      console.error(err);
      alert('Failed to save certificate');
    }
  };

  const handleEdit = (cert: any) => {
    setEditingId(cert.id);
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      date_issued: cert.date_issued || '',
      credential_url: cert.credential_url || '',
      image_url: cert.image_url || ''
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    try {
      await fetchAPI(`/certificates/${id}`, { method: 'DELETE' });
      loadCertificates();
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      
      const res = await fetch(`${API_BASE_URL}/upload?file_type=certification`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: formDataUpload,
      });
      
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      setFormData(prev => ({ ...prev, image_url: `${BASE_URL}${data.file_url}` }));
    } catch (err) {
      console.error(err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-[var(--color-on-surface)]" style={{fontFamily: 'Geist, sans-serif'}}>Certifications Manager</h2>
      </div>

      <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] p-6">
        <h3 className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-4" style={{fontFamily: 'JetBrains Mono, monospace'}}>
          {editingId ? 'Edit Certificate' : 'Add New Certificate'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Title</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Issuer</label>
              <input type="text" required value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Date Issued</label>
              <input type="text" value={formData.date_issued} onChange={e => setFormData({...formData, date_issued: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" placeholder="e.g. June 2024" />
            </div>
            <div>
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Credential URL</label>
              <input type="url" value={formData.credential_url} onChange={e => setFormData({...formData, credential_url: e.target.value})} className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-2 text-[var(--color-on-surface)]" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>Image Upload</label>
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-orange/10 file:text-brand-orange hover:file:bg-brand-orange/20 cursor-pointer"
                />
                {uploading && <span className="text-sm text-[var(--color-on-surface-variant)]">Uploading...</span>}
              </div>
              {formData.image_url && (
                <div className="mt-2 text-sm text-[var(--color-primary)] truncate">
                  Current: {formData.image_url}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button type="submit" className="bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] px-6 py-2 rounded-lg font-bold text-sm tracking-widest uppercase" style={{fontFamily: 'JetBrains Mono, monospace'}}>
              {editingId ? 'Update' : 'Save'} Certificate
            </button>
            {editingId && (
              <button type="button" onClick={() => {setEditingId(null); setFormData({ title: '', issuer: '', date_issued: '', credential_url: '', image_url: '' });}} className="bg-[var(--color-surface)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] px-6 py-2 rounded-lg font-bold text-sm tracking-widest uppercase" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-[var(--color-on-surface-variant)]">Loading...</div>
        ) : certificates.map((cert: any) => (
          <div key={cert.id} className="bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-xl overflow-hidden flex flex-col">
            {cert.image_url && (
              <img src={cert.image_url} alt={cert.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h4 className="text-lg font-bold text-[var(--color-on-surface)] mb-1">{cert.title}</h4>
              <p className="text-sm text-[var(--color-primary)] mb-4">{cert.issuer}</p>
              
              <div className="mt-auto flex justify-between items-center pt-4 border-t border-[var(--color-outline-variant)]">
                <button onClick={() => handleEdit(cert)} className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                  <span className="material-symbols-outlined text-sm">edit</span> Edit
                </button>
                <button onClick={() => handleDelete(cert.id)} className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-error)] hover:text-[var(--color-error-container)] transition-colors flex items-center gap-1" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                  <span className="material-symbols-outlined text-sm">delete</span> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
