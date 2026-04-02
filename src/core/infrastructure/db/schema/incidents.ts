import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { campuses } from './campuses';
import { resources } from './resources';
import { bookings } from './bookings';
import { loans } from './loans';
import { associations } from './associations';
import { clubs } from './clubs';
import { events } from './events';
import { users } from './users';

export const incidents = pgTable('incidents', {
  id: uuid('id').primaryKey().defaultRandom(),
  campusId: uuid('campus_id').notNull().references(() => campuses.id),
  resourceId: uuid('resource_id').references(() => resources.id),
  bookingId: uuid('booking_id').references(() => bookings.id),
  loanId: uuid('loan_id').references(() => loans.id),
  associationId: uuid('association_id').references(() => associations.id),
  clubId: uuid('club_id').references(() => clubs.id),
  eventId: uuid('event_id').references(() => events.id),
  reportedBy: uuid('reported_by').notNull().references(() => users.id),
  assignedTo: uuid('assigned_to').references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 2000 }).notNull(),
  severity: varchar('severity', { length: 50 }).notNull().default('low'),
  status: varchar('status', { length: 50 }).notNull().default('open'),
  occurredAt: timestamp('occurred_at'),
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Incident = typeof incidents.$inferSelect;
export type NewIncident = typeof incidents.$inferInsert;