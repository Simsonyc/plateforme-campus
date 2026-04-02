import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { campuses } from './campuses';
import { resources } from './resources';
import { users } from './users';
import { clubs } from './clubs';
import { associations } from './associations';

export const loans = pgTable('loans', {
  id: uuid('id').primaryKey().defaultRandom(),
  campusId: uuid('campus_id').notNull().references(() => campuses.id),
  resourceId: uuid('resource_id').notNull().references(() => resources.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  clubId: uuid('club_id').references(() => clubs.id),
  associationId: uuid('association_id').references(() => associations.id),
  startDate: timestamp('start_date').notNull(),
  dueDate: timestamp('due_date').notNull(),
  returnDate: timestamp('return_date'),
  approvedBy: uuid('approved_by').references(() => users.id),
  status: varchar('status', { length: 50 }).notNull().default('draft'),
  notes: varchar('notes', { length: 1000 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Loan = typeof loans.$inferSelect;
export type NewLoan = typeof loans.$inferInsert;