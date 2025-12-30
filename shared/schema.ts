import { pgTable, text, timestamp, uuid, varchar, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password_hash: varchar('password_hash', { length: 255 }).notNull(),
  display_name: varchar('display_name', { length: 255 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Events table
export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  date: varchar('date', { length: 100 }).notNull(),
  time: varchar('time', { length: 100 }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  background_image_url: varchar('background_image_url', { length: 500 }),
  target_date: timestamp('target_date').notNull(),
  creator: uuid('creator').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  max_registrations: text('max_registrations'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Event registrations
export const registrations = pgTable('event_registrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  event_id: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  user_id: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  registered_at: timestamp('registered_at').defaultNow().notNull(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({ id: true, created_at: true, updated_at: true });
export const selectUserSchema = createSelectSchema(users);

export const insertEventSchema = createInsertSchema(events).omit({ id: true, created_at: true, updated_at: true });
export const selectEventSchema = createSelectSchema(events);

export const insertRegistrationSchema = createInsertSchema(registrations).omit({ id: true, registered_at: true });
export const selectRegistrationSchema = createSelectSchema(registrations);

// TypeScript types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type Registration = typeof registrations.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
