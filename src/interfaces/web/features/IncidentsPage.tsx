import { db } from '../../../core/infrastructure/db/client/index';
import { incidents } from '../../../core/infrastructure/db/schema/incidents';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';
import { users } from '../../../core/infrastructure/db/schema/users';
import { eq } from 'drizzle-orm';
import CreateIncidentForm from './CreateIncidentForm';

export default async function IncidentsPage() {
  const result = await db
    .select({
      id: incidents.id,
      title: incidents.title,
      description: incidents.description,
      severity: incidents.severity,
      status: incidents.status,
      createdAt: incidents.createdAt,
      campusName: campuses.name,
      reportedByFirstName: users.firstName,
      reportedByLastName: users.lastName,
    })
    .from(incidents)
    .leftJoin(campuses, eq(incidents.campusId, campuses.id))
    .leftJoin(users, eq(incidents.reportedBy, users.id));

  const allCampuses = await db.select().from(campuses);
  const allUsers = await db.select().from(users);
  const demoCampusId = allCampuses[0]?.id;
  const demoUserId = allUsers[0]?.id;

  const severityColors: Record<string, { bg: string; color: string; emoji: string }> = {
    low: { bg: '#dcfce7', color: '#166534', emoji: '🟢' },
    medium: { bg: '#fef3c7', color: '#92400e', emoji: '🟡' },
    high: { bg: '#ffedd5', color: '#9a3412', emoji: '🟠' },
    critical: { bg: '#fee2e2', color: '#dc2626', emoji: '🔴' },
  };

  const statusColors: Record<string, { bg: string; color: string }> = {
    open: { bg: '#fee2e2', color: '#dc2626' },
    in_progress: { bg: '#fef3c7', color: '#92400e' },
    resolved: { bg: '#dcfce7', color: '#166534' },
    closed: { bg: '#f1f5f9', color: '#64748b' },
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Retour</a>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: '0.5rem 0 1.5rem' }}>🚨 Incidents</h1>

        {demoCampusId && demoUserId && (
          <CreateIncidentForm campusId={demoCampusId} userId={demoUserId} />
        )}

        <p style={{ color: '#64748b', marginBottom: '1rem' }}>{result.length} incident(s)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {result.length === 0 && (
            <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
              Aucun incident déclaré
            </div>
          )}
          {result.map((incident) => (
            <div key={incident.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '1.1rem' }}>{incident.title}</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                    👤 {incident.reportedByFirstName} {incident.reportedByLastName} — 🎓 {incident.campusName}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>{incident.description}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                    📅 {new Date(incident.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', marginLeft: '1rem' }}>
                  <span style={{ background: severityColors[incident.severity]?.bg, color: severityColors[incident.severity]?.color, fontSize: '0.75rem', fontWeight: 500, padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
                    {severityColors[incident.severity]?.emoji} {incident.severity}
                  </span>
                  <span style={{ background: statusColors[incident.status]?.bg, color: statusColors[incident.status]?.color, fontSize: '0.75rem', fontWeight: 500, padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
                    {incident.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
