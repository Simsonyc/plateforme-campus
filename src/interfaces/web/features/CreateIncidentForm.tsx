'use client';

import { useState } from 'react';
import { createIncident } from './CreateIncidentAction';

export default function CreateIncidentForm({ campusId, userId }: { campusId: string; userId: string }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('low');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const result = await createIncident({ campusId, userId, title, description, severity });
    if (result.success) {
      setStatus('success');
      setMessage('Incident déclaré !');
      setTitle(''); setDescription(''); setSeverity('low');
    } else {
      setStatus('error');
      setMessage(result.error || 'Erreur');
    }
  }

  const severityColors: Record<string, string> = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#f97316',
    critical: '#dc2626',
  };

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '1.25rem' }}>🚨 Déclarer un incident</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>Titre *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Matériel endommagé" required
            style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>Gravité</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {['low', 'medium', 'high', 'critical'].map((s) => (
              <button key={s} type="button" onClick={() => setSeverity(s)}
                style={{ padding: '0.5rem', borderRadius: '8px', border: `2px solid ${severity === s ? severityColors[s] : '#e2e8f0'}`, background: severity === s ? severityColors[s] : 'white', color: severity === s ? 'white' : '#64748b', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>
                {s === 'low' ? '🟢 Faible' : s === 'medium' ? '🟡 Moyen' : s === 'high' ? '🟠 Élevé' : '🔴 Critique'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>Description *</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Décrivez l'incident en détail..." rows={4} required
            style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem', resize: 'vertical' }} />
        </div>

        {status === 'success' && (
          <div style={{ background: '#dcfce7', color: '#166534', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>✓ {message}</div>
        )}
        {status === 'error' && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>✗ {message}</div>
        )}

        <button type="submit" disabled={status === 'loading' || !title.trim() || !description.trim()}
          style={{ background: !title.trim() || !description.trim() ? '#94a3b8' : '#dc2626', color: 'white', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
          {status === 'loading' ? 'Envoi...' : 'Déclarer l\'incident'}
        </button>
      </form>
    </div>
  );
}