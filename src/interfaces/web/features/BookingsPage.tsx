import { db } from '../../../core/infrastructure/db/client/index';
import { bookings } from '../../../core/infrastructure/db/schema/bookings';
import { resources } from '../../../core/infrastructure/db/schema/resources';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';
import { users } from '../../../core/infrastructure/db/schema/users';
import { eq } from 'drizzle-orm';
import CreateBookingForm from './CreateBookingForm';
import BookingActionButtons from './BookingActionButtons';

export default async function BookingsPage() {
  const result = await db
    .select({
      id: bookings.id,
      title: bookings.title,
      purpose: bookings.purpose,
      startAt: bookings.startAt,
      endAt: bookings.endAt,
      status: bookings.status,
      resourceName: resources.name,
      resourceType: resources.resourceType,
      campusName: campuses.name,
    })
    .from(bookings)
    .leftJoin(resources, eq(bookings.resourceId, resources.id))
    .leftJoin(campuses, eq(bookings.campusId, campuses.id));

  const allResources = await db.select().from(resources);
  const allCampuses = await db.select().from(campuses);
  const allUsers = await db.select().from(users);
  const demoCampusId = allCampuses[0]?.id;
  const demoUserId = allUsers[0]?.id;

  const resourcesForForm = allResources.map(r => ({
    id: r.id,
    name: r.name,
    resourceType: r.resourceType,
  }));

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Retour</a>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: '0.5rem 0 1.5rem' }}>📦 Réservations</h1>

        {demoCampusId && demoUserId && resourcesForForm.length > 0 && (
          <CreateBookingForm campusId={demoCampusId} userId={demoUserId} resources={resourcesForForm} />
        )}

        <p style={{ color: '#64748b', marginBottom: '1rem' }}>{result.length} réservation(s)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {result.length === 0 && (
            <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
              Aucune réservation pour l'instant
            </div>
          )}
          {result.map((booking) => (
            <div key={booking.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '1.1rem' }}>{booking.title}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>📦 {booking.resourceName} — 🎓 {booking.campusName}</div>
                <div style={{ fontSize: '0.875rem', color: '#475569', marginTop: '0.25rem' }}>
                  📅 {new Date(booking.startAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                  {' → '}
                  {new Date(booking.endAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                </div>
                {booking.purpose && <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>{booking.purpose}</div>}
              </div>
              <div style={{ marginLeft: '1rem' }}>
                <BookingActionButtons bookingId={booking.id} status={booking.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}