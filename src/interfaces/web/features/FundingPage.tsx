import { db } from '../../../core/infrastructure/db/client/index';
import { fundingRequests } from '../../../core/infrastructure/db/schema/funding-requests';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';
import { clubs } from '../../../core/infrastructure/db/schema/clubs';
import { users } from '../../../core/infrastructure/db/schema/users';
import { eq } from 'drizzle-orm';
import CreateFundingForm from './CreateFundingForm';
import FundingActionButtons from './FundingActionButtons';

export default async function FundingPage() {
  const result = await db
    .select({
      id: fundingRequests.id,
      title: fundingRequests.title,
      description: fundingRequests.description,
      category: fundingRequests.category,
      amountRequested: fundingRequests.amountRequested,
      amountApproved: fundingRequests.amountApproved,
      status: fundingRequests.status,
      campusName: campuses.name,
      clubName: clubs.name,
    })
    .from(fundingRequests)
    .leftJoin(campuses, eq(fundingRequests.campusId, campuses.id))
    .leftJoin(clubs, eq(fundingRequests.clubId, clubs.id));

  const allCampuses = await db.select().from(campuses);
  const allClubs = await db.select().from(clubs);
  const allUsers = await db.select().from(users);
  const demoCampusId = allCampuses[0]?.id;
  const demoClubId = allClubs[0]?.id;
  const demoUserId = allUsers[0]?.id;

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Retour</a>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: '0.5rem 0 1.5rem' }}>💰 Financement</h1>

        {demoCampusId && demoClubId && demoUserId && (
          <CreateFundingForm campusId={demoCampusId} clubId={demoClubId} userId={demoUserId} />
        )}

        <p style={{ color: '#64748b', marginBottom: '1rem' }}>{result.length} demande(s)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {result.length === 0 && (
            <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
              Aucune demande pour l'instant
            </div>
          )}
          {result.map((req) => (
            <div key={req.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '1.1rem' }}>{req.title}</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>🎯 {req.clubName} — 🎓 {req.campusName}</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>📂 {req.category}</div>
                  {req.description && <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>{req.description}</div>}
                  <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.1rem', marginTop: '0.5rem' }}>{req.amountRequested} €</div>
                </div>
                <div style={{ marginLeft: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <FundingActionButtons
                    fundingId={req.id}
                    status={req.status}
                    amountRequested={req.amountRequested}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}