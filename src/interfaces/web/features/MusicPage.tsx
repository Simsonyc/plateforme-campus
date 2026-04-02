import { db } from '../../../core/infrastructure/db/client/index';
import { musicInstruments } from '../../../core/infrastructure/db/schema/music';
import { musicBands } from '../../../core/infrastructure/db/schema/music';
import { musicRehearsals } from '../../../core/infrastructure/db/schema/music';
import { clubs } from '../../../core/infrastructure/db/schema/clubs';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';
import { eq } from 'drizzle-orm';

export default async function MusicPage() {
  const instruments = await db
    .select({
      id: musicInstruments.id,
      name: musicInstruments.name,
      instrumentType: musicInstruments.instrumentType,
      conditionStatus: musicInstruments.conditionStatus,
      isAvailable: musicInstruments.isAvailable,
      clubName: clubs.name,
    })
    .from(musicInstruments)
    .leftJoin(clubs, eq(musicInstruments.clubId, clubs.id));

  const bands = await db
    .select({
      id: musicBands.id,
      name: musicBands.name,
      description: musicBands.description,
      clubName: clubs.name,
      campusName: campuses.name,
    })
    .from(musicBands)
    .leftJoin(clubs, eq(musicBands.clubId, clubs.id))
    .leftJoin(campuses, eq(musicBands.campusId, campuses.id));

  const rehearsals = await db
    .select({
      id: musicRehearsals.id,
      startAt: musicRehearsals.startAt,
      endAt: musicRehearsals.endAt,
      clubName: clubs.name,
    })
    .from(musicRehearsals)
    .leftJoin(clubs, eq(musicRehearsals.clubId, clubs.id));

  const conditionColors: Record<string, { bg: string; color: string }> = {
    good: { bg: '#dcfce7', color: '#166534' },
    fair: { bg: '#fef3c7', color: '#92400e' },
    poor: { bg: '#fee2e2', color: '#dc2626' },
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Retour</a>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: '0.5rem 0 1.5rem' }}>🎵 Module Musique</h1>

        {/* Instruments */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '1rem' }}>🎸 Instruments ({instruments.length})</h2>
          {instruments.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Aucun instrument</p>}
          {instruments.map((instrument) => (
            <div key={instrument.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1e293b' }}>{instrument.name}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>🎯 {instrument.clubName} — {instrument.instrumentType}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ background: conditionColors[instrument.conditionStatus]?.bg, color: conditionColors[instrument.conditionStatus]?.color, fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                  {instrument.conditionStatus}
                </span>
                <span style={{ background: instrument.isAvailable ? '#dcfce7' : '#fee2e2', color: instrument.isAvailable ? '#166534' : '#dc2626', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                  {instrument.isAvailable ? '✓ Disponible' : '✗ Indisponible'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Groupes */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '1rem' }}>🎤 Groupes ({bands.length})</h2>
          {bands.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Aucun groupe</p>}
          {bands.map((band) => (
            <div key={band.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ fontWeight: 600, color: '#1e293b' }}>{band.name}</div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>🎯 {band.clubName} — 🎓 {band.campusName}</div>
              {band.description && <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>{band.description}</div>}
            </div>
          ))}
        </div>

        {/* Répétitions */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '1rem' }}>📅 Répétitions ({rehearsals.length})</h2>
          {rehearsals.length === 0 && (
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Aucune répétition planifiée</p>
          )}
          {rehearsals.map((rehearsal) => (
            <div key={rehearsal.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ fontWeight: 600, color: '#1e293b' }}>{rehearsal.clubName}</div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                📅 {new Date(rehearsal.startAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
