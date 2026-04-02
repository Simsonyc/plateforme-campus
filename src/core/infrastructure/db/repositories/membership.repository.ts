import { eq, and, isNull } from 'drizzle-orm';
import { db } from '../client/index';
import { memberships } from '../schema/memberships';
import { Membership, MembershipProps } from '../../../domain/membership/membership.entity';
import { MembershipStatus } from '../../../domain/shared/enums';
import { MembershipRepositoryPort } from '../../../application/membership/membership.repository.port';

export class PgMembershipRepository implements MembershipRepositoryPort {

  private toDomain(row: typeof memberships.$inferSelect): Membership {
    const props: MembershipProps = {
      id: row.id,
      userId: row.userId,
      campusId: row.campusId,
      associationId: row.associationId ?? undefined,
      clubId: row.clubId ?? undefined,
      membershipRole: row.membershipRole,
      status: row.status as MembershipStatus,
      startDate: row.startDate ?? undefined,
      endDate: row.endDate ?? undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
    return Membership.create(props);
  }

  async findById(id: string): Promise<Membership | null> {
    const rows = await db.select().from(memberships).where(eq(memberships.id, id));
    if (rows.length === 0) return null;
    return this.toDomain(rows[0]);
  }

  async findActiveByUserAndClub(userId: string, clubId: string): Promise<Membership | null> {
    const rows = await db.select().from(memberships).where(
      and(
        eq(memberships.userId, userId),
        eq(memberships.clubId, clubId),
        eq(memberships.status, MembershipStatus.ACTIVE)
      )
    );
    if (rows.length === 0) return null;
    return this.toDomain(rows[0]);
  }

  async findActiveByUserAndAssociation(userId: string, associationId: string): Promise<Membership | null> {
    const rows = await db.select().from(memberships).where(
      and(
        eq(memberships.userId, userId),
        eq(memberships.associationId, associationId),
        eq(memberships.status, MembershipStatus.ACTIVE)
      )
    );
    if (rows.length === 0) return null;
    return this.toDomain(rows[0]);
  }

  async findAllByUserId(userId: string): Promise<Membership[]> {
    const rows = await db.select().from(memberships).where(eq(memberships.userId, userId));
    return rows.map(row => this.toDomain(row));
  }

  async findAllByClubId(clubId: string): Promise<Membership[]> {
    const rows = await db.select().from(memberships).where(eq(memberships.clubId, clubId));
    return rows.map(row => this.toDomain(row));
  }

  async findAllByAssociationId(associationId: string): Promise<Membership[]> {
    const rows = await db.select().from(memberships).where(eq(memberships.associationId, associationId));
    return rows.map(row => this.toDomain(row));
  }

  async save(membership: Membership): Promise<void> {
    await db.insert(memberships).values({
      id: membership.id,
      userId: membership.userId,
      campusId: membership.campusId,
      associationId: membership.associationId,
      clubId: membership.clubId,
      membershipRole: membership.membershipRole,
      status: membership.status,
      startDate: membership.startDate,
      endDate: membership.endDate,
      createdAt: membership.createdAt,
      updatedAt: membership.updatedAt,
    }).onConflictDoUpdate({
      target: memberships.id,
      set: {
        status: membership.status,
        updatedAt: new Date(),
      },
    });
  }

  async hasActiveMembership(userId: string, clubId?: string, associationId?: string): Promise<boolean> {
    if (clubId) {
      const rows = await db.select().from(memberships).where(
        and(
          eq(memberships.userId, userId),
          eq(memberships.clubId, clubId),
          eq(memberships.status, MembershipStatus.ACTIVE)
        )
      );
      return rows.length > 0;
    }
    if (associationId) {
      const rows = await db.select().from(memberships).where(
        and(
          eq(memberships.userId, userId),
          eq(memberships.associationId, associationId),
          eq(memberships.status, MembershipStatus.ACTIVE)
        )
      );
      return rows.length > 0;
    }
    return false;
  }
}