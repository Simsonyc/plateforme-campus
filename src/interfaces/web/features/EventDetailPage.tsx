import { db } from '../../../core/infrastructure/db/client/index';
import { events } from '../../../core/infrastructure/db/schema/events';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';
import { clubs } from '../../../core/infrastructure/db/schema/clubs';
import { eventRegistrations } from '../../../core/infrastructure/db/schema/event-registrations';
import { users } from '../../../core/infrastructure/db/schema/users';
import { eq } from 'drizzle-orm';
import RegisterButton from './RegisterButton';

export default async function EventDetailPage({ eventId }: { eventId: string }) {
  const eventResult = await db
    .select({
      id: events.id,
      title: events.title,
      description: events.description,
      location: events.location,
      startAt: events.startAt,
      endAt: events.endAt,
      capacity: events.capacity,
      status: events.status,
      campusName: campuses.name,
      clubName: clubs.name,
    })
    .from(events)
    .leftJoin(campuses, eq(events.campusId, campuses.id))
    .leftJoin(clubs, eq(events.clubId, clubs.id))
    .where(eq(events.id, eventId));

  const event = eventResult[0];
  if (!event) return <div>Événement introuvable</div>;

  const registrations = await db
    .select({
      id: eventRegistrations.id,
      status: eventRegistrations.status,
      firstName: users.firstName,
      lastName: users.lastName,
    })
    .from(eventRegistrations)
    .leftJoin(users, eq(eventRegistrations.userId, users.id))
    .where(eq(eventRegistrations.eventId, eventId));

  const allUsers = await db.select().from(users);
  const demoUserId = allUsers[0]?.id;

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/events" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Retour aux événements</a>

        <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', margin: '1rem 0 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.5rem' }}>📅 {event.title}</h1>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>🎯 {event.clubName} — 🎓 {event.campusName}</div>
              {event.location && <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>📍 {event.location}</div>}
              {event.description && <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.5rem' }}>{event.description}</div>}
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                  📅 {new Date(event.startAt).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>
                {event.capacity && (
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                    👥 {registrations.length} / {event.capacity} inscrits
                  </div>
                )}
              </div>
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 500, padding: '0.25rem 0.75rem', borderRadius: '999px' }}>{event.status}</span>
              {demoUserId && (
                <div style={{ marginTop: '0.75rem' }}>
                  <RegisterButton eventId={event.id} userId={demoUserId} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '1rem' }}>👥 Inscrits ({registrations.length})</h2>
          {registrations.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Aucun inscrit pour l'instant</p>}
          {registrations.map((reg) => (
            <div key={reg.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ fontWeight: 500, color: '#1e293b' }}>{reg.firstName} {reg.lastName}</div>
              <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>{reg.status}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
