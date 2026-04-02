'use client';

import { useState } from 'react';
import { createBooking } from './CreateBookingAction';

interface Resource {
  id: string;
  name: string;
  resourceType: string;
}

export default function CreateBookingForm({ campusId, userId, resources }: { campusId: string; userId: string; resources: Resource[] }) {
  const [resourceId, setResourceId] = useState(resources[0]?.id || '');
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const result = await createBooking({ campusId, resourceId, userId, title, purpose, startAt, endAt });
    if (result.success) {
      setStatus('success');
      setMessage('Réservation soumise !');
      setTitle(''); setPurpose(''); setStartAt(''); setEndAt('');
    } else {
      setStatus('error');
      setMessage(result.error || 'Erreur');
    }
  }

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '1.25rem' }}>📦 Nouvelle réservation</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>Ressource *</label>
          <select value={resourceId} onChange={(e) => setResourceId(e.target.value)}
            style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem' }}>
            {resources.map((r) => (
              <option key={r.id} value={r.id}>{r.name} ({r.resourceType})</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>Titre *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Répétition club musique" required
            style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>Début *</label>
            <input type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)} required
              style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>Fin *</label>
            <input type="datetime-local" value={endAt} onChange={(e) => setEndAt(e.target.value)} required
              style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem' }} />
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>Motif</label>
          <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Expliquez l'usage prévu..." rows={2}
            style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem', resize: 'vertical' }} />
        </div>

        {status === 'success' && (
          <div style={{ background: '#dcfce7', color: '#166534', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>✓ {message}</div>
        )}
        {status === 'error' && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>✗ {message}</div>
        )}

        <button type="submit" disabled={status === 'loading' || !title.trim() || !startAt || !endAt}
          style={{ background: !title.trim() || !startAt || !endAt ? '#94a3b8' : '#f59e0b', color: 'white', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
          {status === 'loading' ? 'Envoi...' : 'Soumettre la réservation'}
        </button>
      </form>
    </div>
  );
}