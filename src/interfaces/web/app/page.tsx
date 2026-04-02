import { db } from '../core/infrastructure/db/client/index';
import { campuses } from '../core/infrastructure/db/schema/campuses';

export default async function HomePage() {
  const allCampuses = await db.select().from(campuses);

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
            🎓 Plateforme Campus
          </h1>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
            Gestion de la vie associative
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#334155', marginBottom: '1rem' }}>
            Campus ({allCampuses.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {allCampuses.map((campus) => (
              <div key={campus.id} style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>{campus.name}</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                    📍 {campus.city}, {campus.country}
                  </div>
                </div>
                <span style={{
                  background: '#dcfce7',
                  color: '#166534',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px'
                }}>
                  ✓ Actif
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}