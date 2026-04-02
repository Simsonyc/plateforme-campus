import { db } from '../../../core/infrastructure/db/client/index';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';
import { clubs } from '../../../core/infrastructure/db/schema/clubs';
import { associations } from '../../../core/infrastructure/db/schema/associations';
import { events } from '../../../core/infrastructure/db/schema/events';
import { fundingRequests } from '../../../core/infrastructure/db/schema/funding-requests';
import { bookings } from '../../../core/infrastructure/db/schema/bookings';
import { memberships } from '../../../core/infrastructure/db/schema/memberships';
import { incidents } from '../../../core/infrastructure/db/schema/incidents';
import { users } from '../../../core/infrastructure/db/schema/users';
import { eq } from 'drizzle-orm';

export default async function AdminPage() {
  const allCampuses = await db.select().from(campuses);
  const allUsers = await db.select().from(users);
  const allClubs = await db.select().from(clubs);
  const allAssociations = await db.select().from(associations);
  const allEvents = await db.select().from(events);
  const allFunding = await db.select().from(fundingRequests);
  const allBookings = await db.select().from(bookings);
  const allMemberships = await db.select().from(memberships);
  const allIncidents = await db.select().from(incidents);

  const pendingMemberships = allMemberships.filter(m => m.status === 'pending');
  const pendingFunding = allFunding.filter(f => f.status === 'submitted' || f.status === 'under_review');
  const pendingBookings = allBookings.filter(b => b.status === 'submitted');
  const openIncidents = allIncidents.filter(i => i.status === 'open' || i.status === 'in_progress');

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Retour</a>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: '0.5rem 0 0.5rem' }}>⚙️ Administration</h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>Tableau de bord administrateur campus</p>

        {/* Alertes */}
        {(pendingMemberships.length > 0 || pendingFunding.length > 0 || pendingBookings.length > 0 || openIncidents.length > 0) && (
          <div style={{ background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#92400e', marginBottom: '0.75rem' }}>⚠️ Actions requises</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {pendingMemberships.length > 0 && (
                <a href="/members" style={{ textDecoration: 'none', color: '#92400e', fontSize: '0.875rem' }}>
                  → {pendingMemberships.length} demande(s) d'adhésion en attente
                </a>
              )}
              {pendingFunding.length > 0 && (
                <a href="/funding" style={{ textDecoration: 'none', color: '#92400e', fontSize: '0.875rem' }}>
                  → {pendingFunding.length} demande(s) de financement à traiter
                </a>
              )}
              {pendingBookings.length > 0 && (
                <a href="/bookings" style={{ textDecoration: 'none', color: '#92400e', fontSize: '0.875rem' }}>
                  → {pendingBookings.length} réservation(s) à valider
                </a>
              )}
              {openIncidents.length > 0 && (
                <a href="/incidents" style={{ textDecoration: 'none', color: '#92400e', fontSize: '0.875rem' }}>
                  → {openIncidents.length} incident(s) ouvert(s)
                </a>
              )}
            </div>
          </div>
        )}

        {/* Stats globales */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { emoji: '🏫', count: allCampuses.length, label: 'Campus', color: '#3b82f6' },
            { emoji: '👤', count: allUsers.length, label: 'Utilisateurs', color: '#8b5cf6' },
            { emoji: '🏛️', count: allAssociations.length, label: 'Associations', color: '#ec4899' },
            { emoji: '🎯', count: allClubs.length, label: 'Clubs', color: '#f59e0b' },
            { emoji: '📅', count: allEvents.length, label: 'Événements', color: '#10b981' },
            { emoji: '👥', count: allMemberships.length, label: 'Adhésions', color: '#06b6d4' },
          ].map((item) => (
            <div key={item.label} style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: `3px solid ${item.color}` }}>
              <div style={{ fontSize: '1.5rem' }}>{item.emoji}</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', margin: '0.25rem 0' }}>{item.count}</div>
              <div style={{ color: '#64748b', fontSize: '0.875rem' }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Campus list */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '1rem' }}>🏫 Campus gérés</h2>
          {allCampuses.map((campus) => (
            <div key={campus.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1e293b' }}>{campus.name}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>📍 {campus.city}, {campus.country} — Code: {campus.code}</div>
              </div>
              <span style={{ background: campus.isActive ? '#dcfce7' : '#fee2e2', color: campus.isActive ? '#166534' : '#dc2626', fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
                {campus.isActive ? '✓ Actif' : '✗ Inactif'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
