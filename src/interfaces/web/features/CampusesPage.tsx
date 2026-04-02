import { db } from '../../../core/infrastructure/db/client/index';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';

export default async function CampusesPage() {
  const allCampuses = await db.select().from(campuses);

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Retour</a>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: '0.5rem 0 0.5rem' }}>🏫 Campus</h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>{allCampuses.length} campus enregistré(s)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {allCampuses.map((campus) => (
            <div key={campus.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '1.1rem' }}>{campus.name}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>📍 {campus.city}, {campus.country}</div>
              </div>
              <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 500, padding: '0.25rem 0.75rem', borderRadius: '999px' }}>✓ Actif</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}