'use server';

import { db } from '../../../core/infrastructure/db/client/index';
import { fundingRequests } from '../../../core/infrastructure/db/schema/funding-requests';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';

interface CreateFundingParams {
  campusId: string;
  clubId: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  amountRequested: string;
}

export async function createFundingRequest(params: CreateFundingParams) {
  if (!params.title.trim()) {
    return { success: false, error: 'Le titre est obligatoire' };
  }
  if (!params.amountRequested || parseFloat(params.amountRequested) <= 0) {
    return { success: false, error: 'Le montant doit être supérieur à 0' };
  }

  await db.insert(fundingRequests).values({
    id: randomUUID(),
    campusId: params.campusId,
    clubId: params.clubId,
    title: params.title,
    description: params.description,
    category: params.category,
    amountRequested: params.amountRequested,
    status: 'draft',
    submittedBy: params.userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath('/funding');
  return { success: true };
}