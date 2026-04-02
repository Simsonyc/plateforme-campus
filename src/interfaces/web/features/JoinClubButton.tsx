'use client';

import { useState } from 'react';
import { joinClub } from './JoinClubAction';

export default function JoinClubButton({ clubId, campusId, userId }: { clubId: string; campusId: string; userId: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleClick() {
    setStatus('loading');
    const result = await joinClub(clubId, campusId, userId);
    if (result.success) {
      setStatus('success');
      setMessage('Demande envoyée !');
    } else {
      setStatus('error');
      setMessage(result.error || 'Erreur');
    }
  }

  if (status === 'success') {
    return (
      <span style={{ background: '#dcfce7', color: '#166534', padding: '0.4rem 0.875rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500 }}>
        ✓ {message}
      </span>
    );
  }

  if (status === 'error') {
    return (
      <span style={{ background: '#fee2e2', color: '#dc2626', padding: '0.4rem 0.875rem', borderRadius: '8px', fontSize: '0.8rem' }}>
        ✗ {message}
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={status === 'loading'}
      style={{
        background: status === 'loading' ? '#94a3b8' : '#8b5cf6',
        color: 'white',
        border: 'none',
        padding: '0.4rem 0.875rem',
        borderRadius: '8px',
        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        fontSize: '0.8rem',
        fontWeight: 500,
      }}
    >
      {status === 'loading' ? 'Envoi...' : 'Rejoindre'}
    </button>
  );
}