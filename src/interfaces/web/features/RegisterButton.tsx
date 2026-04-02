'use client';

import { useState } from 'react';
import { registerToEvent } from './EventRegistrationAction';

export default function RegisterButton({ eventId, userId }: { eventId: string; userId: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleClick() {
    setStatus('loading');
    const result = await registerToEvent(eventId, userId);
    if (result.success) {
      setStatus('success');
      setMessage('Inscription confirmée !');
    } else {
      setStatus('error');
      setMessage(result.error || 'Erreur');
    }
  }

  if (status === 'success') {
    return (
      <span style={{ background: '#dcfce7', color: '#166534', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 500 }}>
        ✓ {message}
      </span>
    );
  }

  if (status === 'error') {
    return (
      <span style={{ background: '#fee2e2', color: '#dc2626', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.875rem' }}>
        ✗ {message}
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={status === 'loading'}
      style={{
        background: status === 'loading' ? '#94a3b8' : '#3b82f6',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        fontSize: '0.875rem',
        fontWeight: 500,
      }}
    >
      {status === 'loading' ? 'Inscription...' : "S'inscrire"}
    </button>
  );
}