import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { campuses } from './campuses';
import { associations } from './associations';
import { clubs } from './clubs';

export const memberships = pgTable('memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  campusId: uuid('campus_id').notNull().references(() => campuses.id),
  associationId: uuid('association_id').references(() => associations.id),
  clubId: uuid('club_id').references(() => clubs.id),
  membershipRole: varchar('membership_role', { length: 50 }).notNull().default('member'),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Membership = typeof memberships.$inferSelect;
export type NewMembership = typeof memberships.$inferInsert;