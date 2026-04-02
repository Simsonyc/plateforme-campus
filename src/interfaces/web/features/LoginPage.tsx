'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@campus-paris.fr');
  const [password, setPassword] = useState('demo');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Email ou mot de passe incorrect');
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🎓</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', margin: '0.5rem 0 0.25rem' }}>Plateforme Campus</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Connectez-vous à votre espace</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem', outline: 'none' }}
            />
          </div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
              ✗ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: loading ? '#94a3b8' : '#3b82f6', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', fontSize: '0.75rem', color: '#64748b' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Compte de démo :</div>
          <div>Email : admin@campus-paris.fr</div>
          <div>Mot de passe : demo (n'importe lequel)</div>
        </div>
      </div>
    </main>
  );
}
