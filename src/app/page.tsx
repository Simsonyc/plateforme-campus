import { db } from '../core/infrastructure/db/client/index';
import { campuses } from '../core/infrastructure/db/schema/campuses';

export default async function HomePage() {
  const allCampuses = await db.select().from(campuses);
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b' }}>🎓 Plateforme Campus</h1>
        <p style={{ color: '#64748b', margin: '0.5rem 0 2rem' }}>Gestion de la vie associative</p>
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}>Campus ({allCampuses.length})</h2>
          {allCampuses.map((campus) => (
            <div key={campus.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{campus.name}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>📍 {campus.city}, {campus.country}</div>
              </div>
              <span style={{ background: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem' }}>✓ Actif</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}