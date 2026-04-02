import { pgTable, uuid, varchar, boolean, integer, timestamp } from 'drizzle-orm/pg-core';
import { campuses } from './campuses';
import { clubs } from './clubs';
import { resources } from './resources';
import { users } from './users';

export const musicInstruments = pgTable('music_instruments', {
  id: uuid('id').primaryKey().defaultRandom(),
  campusId: uuid('campus_id').notNull().references(() => campuses.id),
  clubId: uuid('club_id').notNull().references(() => clubs.id),
  resourceId: uuid('resource_id').references(() => resources.id),
  name: varchar('name', { length: 255 }).notNull(),
  instrumentType: varchar('instrument_type', { length: 100 }).notNull(),
  conditionStatus: varchar('condition_status', { length: 50 }).notNull().default('good'),
  isAvailable: boolean('is_available').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const musicBands = pgTable('music_bands', {
  id: uuid('id').primaryKey().defaultRandom(),
  campusId: uuid('campus_id').notNull().references(() => campuses.id),
  clubId: uuid('club_id').notNull().references(() => clubs.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const musicBandMembers = pgTable('music_band_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  bandId: uuid('band_id').notNull().references(() => musicBands.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  role: varchar('role', { length: 100 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const musicRehearsals = pgTable('music_rehearsals', {
  id: uuid('id').primaryKey().defaultRandom(),
  campusId: uuid('campus_id').notNull().references(() => campuses.id),
  clubId: uuid('club_id').notNull().references(() => clubs.id),
  roomResourceId: uuid('room_resource_id').references(() => resources.id),
  startAt: timestamp('start_at').notNull(),
  endAt: timestamp('end_at').notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type MusicInstrument = typeof musicInstruments.$inferSelect;
export type MusicBand = typeof musicBands.$inferSelect;
export type MusicBandMember = typeof musicBandMembers.$inferSelect;
export type MusicRehearsal = typeof musicRehearsals.$inferSelect;