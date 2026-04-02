'use server';

import { db } from '../../../core/infrastructure/db/client/index';
import { bookings } from '../../../core/infrastructure/db/schema/bookings';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';

interface CreateBookingParams {
  campusId: string;
  resourceId: string;
  userId: string;
  title: string;
  purpose: string;
  startAt: string;
  endAt: string;
}

export async function createBooking(params: CreateBookingParams) {
  if (!params.title.trim()) {
    return { success: false, error: 'Le titre est obligatoire' };
  }
  if (!params.startAt || !params.endAt) {
    return { success: false, error: 'Les dates sont obligatoires' };
  }
  if (new Date(params.startAt) >= new Date(params.endAt)) {
    return { success: false, error: 'La date de fin doit être après la date de début' };
  }

  await db.insert(bookings).values({
    id: randomUUID(),
    campusId: params.campusId,
    resourceId: params.resourceId,
    userId: params.userId,
    title: params.title,
    purpose: params.purpose,
    startAt: new Date(params.startAt),
    endAt: new Date(params.endAt),
    status: 'submitted',
    submittedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath('/bookings');
  return { success: true };
}