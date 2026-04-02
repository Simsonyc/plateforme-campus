'use client';

import { useState } from 'react';
import { createClub } from './CreateClubAction';

export default function CreateClubForm({ campusId, userId }: { campusId: string; userId: string }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [attachmentMode, setAttachmentMode] = useState('independent');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setStatus('loading');

    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const result = await createClub({ campusId, userId, name, description, slug, attachmentMode });

    if (result.success) {
      setStatus('success');
      setMessage('Club créé avec succès !');
      setName('');
      setDescription('');
    } else {
      setStatus('error');
      setMessage(result.error || 'Erreur');
    }
  }

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '1.25rem' }}>➕ Créer un nouveau club</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            Nom du club *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Club Robotique"
            required
            style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem', outline: 'none' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez les activités du club..."
            rows={3}
            style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem', outline: 'none', resize: 'vertical' }}
          />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            Mode de rattachement
          </label>
          <select
            value={attachmentMode}
            onChange={(e) => setAttachmentMode(e.target.value)}
            style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem', outline: 'none' }}
          >
            <option value="independent">Indépendant</option>
            <option value="structuring">En cours de structuration</option>
          </select>
        </div>

        {status === 'success' && (
          <div style={{ background: '#dcfce7', color: '#166534', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            ✓ {message}
          </div>
        )}
        {status === 'error' && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            ✗ {message}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading' || !name.trim()}
          style={{
            background: status === 'loading' || !name.trim() ? '#94a3b8' : '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.625rem 1.25rem',
            borderRadius: '8px',
            cursor: status === 'loading' || !name.trim() ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          {status === 'loading' ? 'Création...' : 'Créer le club'}
        </button>
      </form>
    </div>
  );
}