'use server';

import { db } from '../../../core/infrastructure/db/client/index';
import { clubs } from '../../../core/infrastructure/db/schema/clubs';
import { eq, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';

interface CreateClubParams {
  campusId: string;
  userId: string;
  name: string;
  description: string;
  slug: string;
  attachmentMode: string;
}

export async function createClub(params: CreateClubParams) {
  // Vérifier que le slug n'existe pas déjà sur ce campus
  const existing = await db.select().from(clubs).where(
    and(
      eq(clubs.slug, params.slug),
      eq(clubs.campusId, params.campusId)
    )
  );
  if (existing.length > 0) {
    return { success: false, error: 'Un club avec ce nom existe déjà' };
  }

  await db.insert(clubs).values({
    id: randomUUID(),
    campusId: params.campusId,
    name: params.name,
    slug: params.slug,
    description: params.description,
    attachmentMode: params.attachmentMode,
    visibility: 'private',
    status: 'draft',
    createdBy: params.userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath('/clubs');
  return { success: true };
}