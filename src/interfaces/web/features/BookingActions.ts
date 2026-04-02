'use server';

import { db } from '../../../core/infrastructure/db/client/index';
import { bookings } from '../../../core/infrastructure/db/schema/bookings';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function approveBooking(bookingId: string) {
  await db.update(bookings)
    .set({ status: 'approved', reviewedAt: new Date(), updatedAt: new Date() })
    .where(eq(bookings.id, bookingId));
  revalidatePath('/bookings');
  return { success: true };
}

export async function rejectBooking(bookingId: string) {
  await db.update(bookings)
    .set({ status: 'rejected', reviewedAt: new Date(), updatedAt: new Date() })
    .where(eq(bookings.id, bookingId));
  revalidatePath('/bookings');
  return { success: true };
}