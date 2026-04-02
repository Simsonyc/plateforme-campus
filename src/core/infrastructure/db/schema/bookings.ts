import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { campuses } from './campuses';
import { resources } from './resources';
import { users } from './users';
import { clubs } from './clubs';
import { associations } from './associations';
import { events } from './events';

export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  campusId: uuid('campus_id').notNull().references(() => campuses.id),
  resourceId: uuid('resource_id').notNull().references(() => resources.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  clubId: uuid('club_id').references(() => clubs.id),
  associationId: uuid('association_id').references(() => associations.id),
  eventId: uuid('event_id').references(() => events.id),
  title: varchar('title', { length: 255 }),
  purpose: varchar('purpose', { length: 1000 }),
  startAt: timestamp('start_at').notNull(),
  endAt: timestamp('end_at').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('draft'),
  submittedAt: timestamp('submitted_at'),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;