import { db } from '../core/infrastructure/db/client/index';
import { campuses } from '../core/infrastructure/db/schema/campuses';
import { associations } from '../core/infrastructure/db/schema/associations';
import { clubs } from '../core/infrastructure/db/schema/clubs';
import { events } from '../core/infrastructure/db/schema/events';
import { fundingRequests } from '../core/infrastructure/db/schema/funding-requests';
import { bookings } from '../core/infrastructure/db/schema/bookings';
import { memberships } from '../core/infrastructure/db/schema/memberships';
import { incidents } from '../core/infrastructure/db/schema/incidents';

export default async function HomePage() {
  const allCampuses = await db.select().from(campuses);
  const allAssociations = await db.select().from(associations);
  const allClubs = await db.select().from(clubs);
  const allEvents = await db.select().from(events);
  const allFunding = await db.select().from(fundingRequests);
  const allBookings = await db.select().from(bookings);
  const allMemberships = await db.select().from(memberships);
  const allIncidents = await db.select().from(incidents);

  const sections = [
    { href: '/campuses', emoji: '🏫', count: allCampuses.length, label: 'Campus', color: '#3b82f6' },
    { href: '/associations', emoji: '🏛️', count: allAssociations.length, label: 'Associations', color: '#8b5cf6' },
    { href: '/clubs', emoji: '🎯', count: allClubs.length, label: 'Clubs', color: '#ec4899' },
    { href: '/events', emoji: '📅', count: allEvents.length, label: 'Événements', color: '#f59e0b' },
    { href: '/funding', emoji: '💰', count: allFunding.length, label: 'Financements', color: '#10b981' },
    { href: '/bookings', emoji: '📦', count: allBookings.length, label: 'Réservations', color: '#f97316' },
    { href: '/members', emoji: '👥', count: allMemberships.length, label: 'Membres', color: '#06b6d4' },
    { href: '/incidents', emoji: '🚨', count: allIncidents.length, label: 'Incidents', color: '#dc2626' },
    { href: '/profile', emoji: '👤', count: null, label: 'Mon profil', color: '#64748b' },
    { href: '/admin', emoji: '⚙️', count: null, label: 'Administration', color: '#1e293b' },
  ];

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b' }}>🎓 Plateforme Campus</h1>
        <p style={{ color: '#64748b', margin: '0.5rem 0 2rem' }}>Gestion de la vie associative</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {sections.map((item) => (
            <a key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer', borderTop: `3px solid ${item.color}` }}>
                <div style={{ fontSize: '1.75rem' }}>{item.emoji}</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', margin: '0.5rem 0 0.25rem' }}>
                  {item.count !== null ? item.count : '→'}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.875rem' }}>{item.label}</div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}>Campus actifs</h2>
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