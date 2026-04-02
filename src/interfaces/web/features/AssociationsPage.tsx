import { db } from '../../../core/infrastructure/db/client/index';
import { associations } from '../../../core/infrastructure/db/schema/associations';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';
import { eq } from 'drizzle-orm';

export default async function AssociationsPage() {
  const result = await db
    .select({
      id: associations.id,
      name: associations.name,
      description: associations.description,
      status: associations.status,
      campusName: campuses.name,
    })
    .from(associations)
    .leftJoin(campuses, eq(associations.campusId, campuses.id));

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Retour</a>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: '0.5rem 0 0.5rem' }}>🏛️ Associations</h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>{result.length} association(s)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {result.map((asso) => (
            <div key={asso.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '1.1rem' }}>{asso.name}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>🎓 {asso.campusName}</div>
              </div>
              <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: '0.75rem', fontWeight: 500, padding: '0.25rem 0.75rem', borderRadius: '999px' }}>{asso.status}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}