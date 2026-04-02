import { db } from '../../../core/infrastructure/db/client/index';
import { events } from '../../../core/infrastructure/db/schema/events';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';
import { clubs } from '../../../core/infrastructure/db/schema/clubs';
import { eq } from 'drizzle-orm';

export default async function EventsPage() {
  const result = await db
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
    .leftJoin(clubs, eq(events.clubId, clubs.id));

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Retour</a>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: '0.5rem 0 0.5rem' }}>📅 Événements</h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>{result.length} événement(s)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {result.map((event) => (
            <div key={event.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '1.1rem' }}>{event.title}</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>🎯 {event.clubName} — 🎓 {event.campusName}</div>
                  {event.location && <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>📍 {event.location}</div>}
                  {event.description && <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>{event.description}</div>}
                  <div style={{ fontSize: '0.875rem', color: '#475569', marginTop: '0.5rem', fontWeight: 500 }}>
                    📅 {new Date(event.startAt).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  {event.capacity && <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>👥 {event.capacity} places</div>}
                </div>
                <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 500, padding: '0.25rem 0.75rem', borderRadius: '999px', whiteSpace: 'nowrap' }}>{event.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}