'use server';

import { db } from '../../../core/infrastructure/db/client/index';
import { fundingRequests } from '../../../core/infrastructure/db/schema/funding-requests';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function approveFunding(fundingId: string, amountApproved: string) {
  await db.update(fundingRequests)
    .set({ status: 'approved', amountApproved, reviewedAt: new Date(), updatedAt: new Date() })
    .where(eq(fundingRequests.id, fundingId));
  revalidatePath('/funding');
  return { success: true };
}

export async function rejectFunding(fundingId: string) {
  await db.update(fundingRequests)
    .set({ status: 'rejected', reviewedAt: new Date(), updatedAt: new Date() })
    .where(eq(fundingRequests.id, fundingId));
  revalidatePath('/funding');
  return { success: true };
}

export async function submitFunding(fundingId: string) {
  await db.update(fundingRequests)
    .set({ status: 'submitted', updatedAt: new Date() })
    .where(eq(fundingRequests.id, fundingId));
  revalidatePath('/funding');
  return { success: true };
}