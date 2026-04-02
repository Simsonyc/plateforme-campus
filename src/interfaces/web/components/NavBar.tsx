'use client';

import { useSession, signOut } from 'next-auth/react';

export default function NavBar() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div style={{
      background: 'white',
      borderBottom: '1px solid #e2e8f0',
      padding: '0.75rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'system-ui',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem' }}>🎓</span>
        <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem' }}>Plateforme Campus</span>
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>👤 {session.user?.name}</span>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.4rem 0.875rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}