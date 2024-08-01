import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).unique().notNull(),
    image_url: text('image_url'),
    role_id: uuid('role_id').references(() => roles.id).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    password_hash: varchar('password_hash', { length: 256 }).notNull()
});

export const roles = pgTable('roles', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 256 }).unique().notNull(),
    created_at: timestamp('created_at').defaultNow()
});