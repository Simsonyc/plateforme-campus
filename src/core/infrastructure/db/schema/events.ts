import { pgTable, uuid, varchar, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { campuses } from './campuses';
import { associations } from './associations';
import { clubs } from './clubs';
import { users } from './users';

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  campusId: uuid('campus_id').notNull().references(() => campuses.id),
  associationId: uuid('association_id').references(() => associations.id),
  clubId: uuid('club_id').references(() => clubs.id),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull(),
  description: varchar('description', { length: 2000 }),
  coverUrl: varchar('cover_url', { length: 500 }),
  location: varchar('location', { length: 255 }),
  startAt: timestamp('start_at').notNull(),
  endAt: timestamp('end_at').notNull(),
  capacity: integer('capacity'),
  requiresRegistration: boolean('requires_registration').notNull().default(false),
  visibility: varchar('visibility', { length: 50 }).notNull().default('private'),
  status: varchar('status', { length: 50 }).notNull().default('draft'),
  registrationOpenAt: timestamp('registration_open_at'),
  registrationCloseAt: timestamp('registration_close_at'),
  createdBy: uuid('created_by').notNull().references(() => users.id),
  approvedBy: uuid('approved_by').references(() => users.id),
  approvedAt: timestamp('approved_at'),
  archivedAt: timestamp('archived_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;