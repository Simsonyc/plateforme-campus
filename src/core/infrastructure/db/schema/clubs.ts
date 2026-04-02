import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { campuses } from './campuses';
import { associations } from './associations';
import { users } from './users';

export const clubs = pgTable('clubs', {
  id: uuid('id').primaryKey().defaultRandom(),
  campusId: uuid('campus_id').notNull().references(() => campuses.id),
  associationId: uuid('association_id').references(() => associations.id),
  code: varchar('code', { length: 50 }),
  slug: varchar('slug', { length: 100 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }),
  logoUrl: varchar('logo_url', { length: 500 }),
  clubType: varchar('club_type', { length: 100 }),
  attachmentMode: varchar('attachment_mode', { length: 50 }).notNull().default('independent'),
  visibility: varchar('visibility', { length: 50 }).notNull().default('private'),
  status: varchar('status', { length: 50 }).notNull().default('draft'),
  createdBy: uuid('created_by').references(() => users.id),
  approvedBy: uuid('approved_by').references(() => users.id),
  approvedAt: timestamp('approved_at'),
  archivedAt: timestamp('archived_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Club = typeof clubs.$inferSelect;
export type NewClub = typeof clubs.$inferInsert;