import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';

export const campuses = pgTable('campuses', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  city: varchar('city', { length: 100 }).notNull(),
  country: varchar('country', { length: 100 }).notNull(),
  emailContact: varchar('email_contact', { length: 255 }),
  phoneContact: varchar('phone_contact', { length: 50 }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Campus = typeof campuses.$inferSelect;
export type NewCampus = typeof campuses.$inferInsert;