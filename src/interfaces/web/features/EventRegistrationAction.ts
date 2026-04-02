'use server';

import { db } from '../../../core/infrastructure/db/client/index';
import { eventRegistrations } from '../../../core/infrastructure/db/schema/event-registrations';
import { events } from '../../../core/infrastructure/db/schema/events';
import { eq, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';

export async function registerToEvent(eventId: string, userId: string) {
  // Vérifier que l'événement existe
  const event = await db.select().from(events).where(eq(events.id, eventId));
  if (event.length === 0) {
    return { success: false, error: 'Événement introuvable' };
  }

  // Vérifier qu'il n'est pas déjà inscrit
  const existing = await db.select().from(eventRegistrations).where(
    and(
      eq(eventRegistrations.eventId, eventId),
      eq(eventRegistrations.userId, userId)
    )
  );
  if (existing.length > 0) {
    return { success: false, error: 'Vous êtes déjà inscrit à cet événement' };
  }

  // Créer l'inscription
  await db.insert(eventRegistrations).values({
    id: randomUUID(),
    eventId,
    userId,
    status: 'registered',
    registeredAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath('/events');
  return { success: true };
}