import { eq, and } from 'drizzle-orm';
import { db } from '../client/index';
import { clubs } from '../schema/clubs';
import { Club, ClubProps } from '../../../domain/club/club.entity';
import { AttachmentMode, ClubStatus } from '../../../domain/shared/enums';
import { ClubRepositoryPort } from '../../../application/club/club.repository.port';

export class PgClubRepository implements ClubRepositoryPort {

  private toDomain(row: typeof clubs.$inferSelect): Club {
    const props: ClubProps = {
      id: row.id,
      campusId: row.campusId,
      associationId: row.associationId ?? undefined,
      code: row.code ?? undefined,
      slug: row.slug,
      name: row.name,
      description: row.description ?? undefined,
      logoUrl: row.logoUrl ?? undefined,
      clubType: row.clubType ?? undefined,
      attachmentMode: row.attachmentMode as AttachmentMode,
      visibility: row.visibility,
      status: row.status as ClubStatus,
      createdBy: row.createdBy ?? undefined,
      approvedBy: row.approvedBy ?? undefined,
      approvedAt: row.approvedAt ?? undefined,
      archivedAt: row.archivedAt ?? undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
    return Club.create(props);
  }

  async findById(id: string): Promise<Club | null> {
    const rows = await db.select().from(clubs).where(eq(clubs.id, id));
    if (rows.length === 0) return null;
    return this.toDomain(rows[0]);
  }

  async findBySlug(slug: string, campusId: string): Promise<Club | null> {
    const rows = await db.select().from(clubs).where(
      and(eq(clubs.slug, slug), eq(clubs.campusId, campusId))
    );
    if (rows.length === 0) return null;
    return this.toDomain(rows[0]);
  }

  async findByCampusId(campusId: string): Promise<Club[]> {
    const rows = await db.select().from(clubs).where(eq(clubs.campusId, campusId));
    return rows.map(row => this.toDomain(row));
  }

  async findByAssociationId(associationId: string): Promise<Club[]> {
    const rows = await db.select().from(clubs).where(eq(clubs.associationId, associationId));
    return rows.map(row => this.toDomain(row));
  }

  async save(club: Club): Promise<void> {
    await db.insert(clubs).values({
      id: club.id,
      campusId: club.campusId,
      associationId: club.associationId,
      slug: club.slug,
      name: club.name,
      description: club.description,
      attachmentMode: club.attachmentMode,
      visibility: club.visibility,
      status: club.status,
      createdAt: club.createdAt,
      updatedAt: club.updatedAt,
    }).onConflictDoUpdate({
      target: clubs.id,
      set: {
        name: club.name,
        status: club.status,
        updatedAt: new Date(),
      },
    });
  }

  async exists(id: string): Promise<boolean> {
    const rows = await db.select().from(clubs).where(eq(clubs.id, id));
    return rows.length > 0;
  }
}