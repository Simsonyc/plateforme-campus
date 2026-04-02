import { db } from '../../../core/infrastructure/db/client/index';
import { clubs } from '../../../core/infrastructure/db/schema/clubs';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';
import { memberships } from '../../../core/infrastructure/db/schema/memberships';
import { users } from '../../../core/infrastructure/db/schema/users';
import { eq } from 'drizzle-orm';
import JoinClubButton from './JoinClubButton';

export default async function ClubDetailPage({ clubId }: { clubId: string }) {
  const clubResult = await db
    .select({
      id: clubs.id,
      name: clubs.name,
      description: clubs.description,
      status: clubs.status,
      attachmentMode: clubs.attachmentMode,
      campusId: clubs.campusId,
      campusName: campuses.name,
    })
    .from(clubs)
    .leftJoin(campuses, eq(clubs.campusId, campuses.id))
    .where(eq(clubs.id, clubId));

  const club = clubResult[0];
  if (!club) return <div>Club introuvable</div>;

  const members = await db
    .select({
      id: memberships.id,
      status: memberships.status,
      membershipRole: memberships.membershipRole,
      firstName: users.firstName,
      lastName: users.lastName,
    })
    .from(memberships)
    .leftJoin(users, eq(memberships.userId, users.id))
    .where(eq(memberships.clubId, clubId));

  const allUsers = await db.select().from(users);
  const demoUserId = allUsers[0]?.id;

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/clubs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Retour aux clubs</a>

        <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', margin: '1rem 0 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.5rem' }}>🎯 {club.name}</h1>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>🎓 {club.campusName}</div>
              {club.description && <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.5rem' }}>{club.description}</div>}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>{club.status}</span>
                <span style={{ background: '#f1f5f9', color: '#64748b', fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>{club.attachmentMode}</span>
              </div>
            </div>
            {demoUserId && <JoinClubButton clubId={club.id} campusId={club.campusId} userId={demoUserId} />}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '1rem' }}>👥 Membres ({members.length})</h2>
          {members.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Aucun membre pour l'instant</p>}
          {members.map((member) => (
            <div key={member.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontWeight: 500, color: '#1e293b' }}>{member.firstName} {member.lastName}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{member.membershipRole}</div>
              </div>
              <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>{member.status}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
