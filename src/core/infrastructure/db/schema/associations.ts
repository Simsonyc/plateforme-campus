import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { campuses } from './campuses';
import { users } from './users';

export const associations = pgTable('associations', {
  id: uuid('id').primaryKey().defaultRandom(),
  campusId: uuid('campus_id').notNull().references(() => campuses.id),
  code: varchar('code', { length: 50 }),
  slug: varchar('slug', { length: 100 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }),
  logoUrl: varchar('logo_url', { length: 500 }),
  emailContact: varchar('email_contact', { length: 255 }),
  phoneContact: varchar('phone_contact', { length: 50 }),
  visibility: varchar('visibility', { length: 50 }).notNull().default('private'),
  status: varchar('status', { length: 50 }).notNull().default('draft'),
  createdBy: uuid('created_by').references(() => users.id),
  approvedBy: uuid('approved_by').references(() => users.id),
  approvedAt: timestamp('approved_at'),
  archivedAt: timestamp('archived_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Association = typeof associations.$inferSelect;
export type NewAssociation = typeof associations.$inferInsert;