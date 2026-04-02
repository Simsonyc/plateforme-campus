import { db } from '../../../core/infrastructure/db/client/index';
import { memberships } from '../../../core/infrastructure/db/schema/memberships';
import { users } from '../../../core/infrastructure/db/schema/users';
import { clubs } from '../../../core/infrastructure/db/schema/clubs';
import { associations } from '../../../core/infrastructure/db/schema/associations';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';
import { eq } from 'drizzle-orm';
import MembershipActionButtons from './MembershipActionButtons';

export default async function MembersPage() {
  const result = await db
    .select({
      id: memberships.id,
      membershipRole: memberships.membershipRole,
      status: memberships.status,
      createdAt: memberships.createdAt,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      clubName: clubs.name,
      associationName: associations.name,
      campusName: campuses.name,
    })
    .from(memberships)
    .leftJoin(users, eq(memberships.userId, users.id))
    .leftJoin(clubs, eq(memberships.clubId, clubs.id))
    .leftJoin(associations, eq(memberships.associationId, associations.id))
    .leftJoin(campuses, eq(memberships.campusId, campuses.id));

  const statusColors: Record<string, { bg: string; color: string }> = {
    pending: { bg: '#fef3c7', color: '#92400e' },
    active: { bg: '#dcfce7', color: '#166534' },
    suspended: { bg: '#fee2e2', color: '#dc2626' },
    rejected: { bg: '#f1f5f9', color: '#64748b' },
    left: { bg: '#f1f5f9', color: '#64748b' },
  };

  const pending = result.filter(m => m.status === 'pending');
  const others = result.filter(m => m.status !== 'pending');

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Retour</a>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: '0.5rem 0 1.5rem' }}>👥 Membres</h1>

        {pending.length > 0 && (
          <div style={{ background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#92400e', marginBottom: '1rem' }}>⏳ Demandes en attente ({pending.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {pending.map((member) => (
                <div key={member.id} style={{ background: 'white', borderRadius: '8px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{member.firstName} {member.lastName}</div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      {member.clubName ? `🎯 ${member.clubName}` : `🏛️ ${member.associationName}`}
                    </div>
                  </div>
                  <MembershipActionButtons membershipId={member.id} />
                </div>
              ))}
            </div>
          </div>
        )}

        <p style={{ color: '#64748b', marginBottom: '1rem' }}>{result.length} adhésion(s) au total</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {others.map((member) => (
            <div key={member.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '1.1rem' }}>{member.firstName} {member.lastName}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>✉️ {member.email}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                  {member.clubName ? `🎯 ${member.clubName}` : `🏛️ ${member.associationName}`} — 🎓 {member.campusName}
                </div>
              </div>
              <span style={{ background: statusColors[member.status]?.bg || '#f1f5f9', color: statusColors[member.status]?.color || '#64748b', fontSize: '0.75rem', fontWeight: 500, padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
                {member.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}