'use server';

import { db } from '../../../core/infrastructure/db/client/index';
import { memberships } from '../../../core/infrastructure/db/schema/memberships';
import { eq, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';

export async function joinClub(clubId: string, campusId: string, userId: string) {
  const existing = await db.select().from(memberships).where(
    and(
      eq(memberships.userId, userId),
      eq(memberships.clubId, clubId)
    )
  );
  if (existing.length > 0) {
    return { success: false, error: 'Vous êtes déjà membre de ce club' };
  }

  await db.insert(memberships).values({
    id: randomUUID(),
    userId,
    campusId,
    clubId,
    membershipRole: 'member',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath('/clubs');
  return { success: true };
}