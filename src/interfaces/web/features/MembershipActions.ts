'use server';

import { db } from '../../../core/infrastructure/db/client/index';
import { memberships } from '../../../core/infrastructure/db/schema/memberships';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function approveMembership(membershipId: string) {
  await db.update(memberships)
    .set({ status: 'active', updatedAt: new Date() })
    .where(eq(memberships.id, membershipId));
  revalidatePath('/members');
  revalidatePath('/clubs');
  return { success: true };
}

export async function rejectMembership(membershipId: string) {
  await db.update(memberships)
    .set({ status: 'rejected', updatedAt: new Date() })
    .where(eq(memberships.id, membershipId));
  revalidatePath('/members');
  revalidatePath('/clubs');
  return { success: true };
}