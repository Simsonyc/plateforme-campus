'use server';

import { db } from '../../../core/infrastructure/db/client/index';
import { incidents } from '../../../core/infrastructure/db/schema/incidents';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';

interface CreateIncidentParams {
  campusId: string;
  userId: string;
  title: string;
  description: string;
  severity: string;
}

export async function createIncident(params: CreateIncidentParams) {
  if (!params.title.trim()) {
    return { success: false, error: 'Le titre est obligatoire' };
  }
  if (!params.description.trim()) {
    return { success: false, error: 'La description est obligatoire' };
  }

  await db.insert(incidents).values({
    id: randomUUID(),
    campusId: params.campusId,
    reportedBy: params.userId,
    title: params.title,
    description: params.description,
    severity: params.severity,
    status: 'open',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath('/incidents');
  return { success: true };
}