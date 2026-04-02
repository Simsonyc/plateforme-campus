import { db } from '../../../core/infrastructure/db/client/index';
import { clubs } from '../../../core/infrastructure/db/schema/clubs';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';
import { associations } from '../../../core/infrastructure/db/schema/associations';
import { users } from '../../../core/infrastructure/db/schema/users';
import { eq } from 'drizzle-orm';
import CreateClubForm from './CreateClubForm';
import JoinClubButton from './JoinClubButton';

export default async function ClubsPage() {
  const result = await db
    .select({
      id: clubs.id,
      name: clubs.name,
      description: clubs.description,
      status: clubs.status,
      attachmentMode: clubs.attachmentMode,
      campusId: clubs.campusId,
      campusName: campuses.name,
      associationName: associations.name,
    })
    .from(clubs)
    .leftJoin(campuses, eq(clubs.campusId, campuses.id))
    .leftJoin(associations, eq(clubs.associationId, associations.id));

  const allCampuses = await db.select().from(campuses);
  const allUsers = await db.select().from(users);
  const demoCampusId = allCampuses[0]?.id;
  const demoUserId = allUsers[0]?.id;

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Retour</a>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: '0.5rem 0 1.5rem' }}>🎯 Clubs</h1>

        {demoCampusId && demoUserId && (
          <CreateClubForm campusId={demoCampusId} userId={demoUserId} />
        )}

        <p style={{ color: '#64748b', marginBottom: '1rem' }}>{result.length} club(s) enregistré(s)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {result.length === 0 && (
            <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
              Aucun club pour l'instant
            </div>
          )}
          {result.map((club) => (
            <div key={club.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <a href={`/clubs/${club.id}`} style={{ textDecoration: 'none', flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '1.1rem' }}>{club.name}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>🎓 {club.campusName}</div>
                {club.description && <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>{club.description}</div>}
              </a>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', marginLeft: '1rem' }}>
                <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: '0.75rem', fontWeight: 500, padding: '0.25rem 0.75rem', borderRadius: '999px' }}>{club.status}</span>
                {demoUserId && (
                  <JoinClubButton clubId={club.id} campusId={club.campusId} userId={demoUserId} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}