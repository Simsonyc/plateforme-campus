import { pgTable, uuid, varchar, boolean, integer, timestamp } from 'drizzle-orm/pg-core';
import { campuses } from './campuses';
import { associations } from './associations';
import { clubs } from './clubs';

export const resources = pgTable('resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  campusId: uuid('campus_id').notNull().references(() => campuses.id),
  code: varchar('code', { length: 50 }),
  name: varchar('name', { length: 255 }).notNull(),
  resourceType: varchar('resource_type', { length: 50 }).notNull(),
  description: varchar('description', { length: 1000 }),
  quantity: integer('quantity').default(1),
  isActive: boolean('is_active').notNull().default(true),
  isShared: boolean('is_shared').notNull().default(false),
  ownerAssociationId: uuid('owner_association_id').references(() => associations.id),
  ownerClubId: uuid('owner_club_id').references(() => clubs.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;