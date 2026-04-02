import { db } from '../../../core/infrastructure/db/client/index';
import { users } from '../../../core/infrastructure/db/schema/users';
import { memberships } from '../../../core/infrastructure/db/schema/memberships';
import { eventRegistrations } from '../../../core/infrastructure/db/schema/event-registrations';
import { fundingRequests } from '../../../core/infrastructure/db/schema/funding-requests';
import { clubs } from '../../../core/infrastructure/db/schema/clubs';
import { events } from '../../../core/infrastructure/db/schema/events';
import { eq } from 'drizzle-orm';

export default async function ProfilePage() {
  const allUsers = await db.select().from(users);
  const demoUser = allUsers[0];

  if (!demoUser) {
    return <div>Aucun utilisateur trouvé</div>;
  }

  const userMemberships = await db
    .select({ id: memberships.id, status: memberships.status, membershipRole: memberships.membershipRole, clubName: clubs.name })
    .from(memberships)
    .leftJoin(clubs, eq(memberships.clubId, clubs.id))
    .where(eq(memberships.userId, demoUser.id));

  const userRegistrations = await db
    .select({ id: eventRegistrations.id, status: eventRegistrations.status, eventTitle: events.title, eventStartAt: events.startAt })
    .from(eventRegistrations)
    .leftJoin(events, eq(eventRegistrations.eventId, events.id))
    .where(eq(eventRegistrations.userId, demoUser.id));

  const userFunding = await db
    .select().from(fundingRequests)
    .where(eq(fundingRequests.submittedBy, demoUser.id));

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Retour</a>

        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', margin: '1rem 0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>
              {demoUser.firstName[0]}{demoUser.lastName[0]}
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>{demoUser.firstName} {demoUser.lastName}</div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>✉️ {demoUser.email}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { emoji: '🎯', count: userMemberships.length, label: 'Clubs' },
            { emoji: '📅', count: userRegistrations.length, label: 'Événements' },
            { emoji: '💰', count: userFunding.length, label: 'Demandes' },
          ].map((item) => (
            <div key={item.label} style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem' }}>{item.emoji}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>{item.count}</div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '1rem' }}>🎯 Mes clubs</h2>
          {userMemberships.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Aucun club</p>}
          {userMemberships.map((m) => (
            <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#1e293b', fontWeight: 500 }}>{m.clubName}</span>
              <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>{m.status}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '1rem' }}>📅 Mes événements</h2>
          {userRegistrations.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Aucun événement</p>}
          {userRegistrations.map((r) => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#1e293b', fontWeight: 500 }}>{r.eventTitle}</span>
              <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
