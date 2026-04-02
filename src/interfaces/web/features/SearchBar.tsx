'use client';

import { useState } from 'react';

interface SearchResult {
  type: string;
  name: string;
  subtitle: string;
  href: string;
  emoji: string;
}

export default function SearchBar({ data }: { data: SearchResult[] }) {
  const [query, setQuery] = useState('');

  const filtered = query.trim().length > 1
    ? data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div style={{ position: 'relative', marginBottom: '2rem' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Rechercher un club, événement, association..."
        style={{
          width: '100%',
          padding: '0.875rem 1.25rem',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          fontSize: '1rem',
          background: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          outline: 'none',
        }}
      />
      {filtered.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 100,
          marginTop: '0.5rem',
          overflow: 'hidden',
        }}>
          {filtered.map((item, i) => (
            <a key={i} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '0.875rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderBottom: '1px solid #f1f5f9',
                cursor: 'pointer',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={e => (e.currentTarget.style.background = 'white')}
              >
                <span style={{ fontSize: '1.25rem' }}>{item.emoji}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.875rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.subtitle}</div>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#94a3b8', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  {item.type}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
      {query.trim().length > 1 && filtered.length === 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          color: '#94a3b8',
          fontSize: '0.875rem',
          marginTop: '0.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>
          Aucun résultat pour "{query}"
        </div>
      )}
    </div>
  );
}