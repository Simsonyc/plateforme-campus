import { pgTable, uuid, varchar, timestamp, numeric } from 'drizzle-orm/pg-core';
import { campuses } from './campuses';
import { associations } from './associations';
import { clubs } from './clubs';
import { events } from './events';
import { users } from './users';

export const fundingRequests = pgTable('funding_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  campusId: uuid('campus_id').notNull().references(() => campuses.id),
  associationId: uuid('association_id').references(() => associations.id),
  clubId: uuid('club_id').references(() => clubs.id),
  eventId: uuid('event_id').references(() => events.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 2000 }),
  category: varchar('category', { length: 100 }).notNull(),
  amountRequested: numeric('amount_requested', { precision: 10, scale: 2 }).notNull(),
  amountApproved: numeric('amount_approved', { precision: 10, scale: 2 }),
  status: varchar('status', { length: 50 }).notNull().default('draft'),
  submittedBy: uuid('submitted_by').notNull().references(() => users.id),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  decisionComment: varchar('decision_comment', { length: 1000 }),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type FundingRequest = typeof fundingRequests.$inferSelect;
export type NewFundingRequest = typeof fundingRequests.$inferInsert;