import { relations, sql } from "drizzle-orm";
import { boolean, date, json, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    first_name: varchar('first_name', { length: 256 }).notNull(),
    last_name: varchar('last_name', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).unique().notNull(),
    image_url: text('image_url'),
    role_id: uuid('role_id').references(() => roles.id),
    created_at: timestamp('created_at').defaultNow(),
    auth_id: varchar('auth_id', { length: 256 }).unique().notNull(),
    company_id: uuid('company_id').references(() => companies.id)
});

export const usersRelations = relations(users, ({ one }) => ({
    company: one(companies, {
        fields: [users.company_id],
        references: [companies.id]
    })
}));

export type NewUser = typeof users.$inferInsert;
export type NewRole = typeof roles.$inferInsert;
export type NewCompany = typeof companies.$inferInsert;
export type User = typeof users.$inferSelect;
export type Company = typeof companies.$inferSelect;

export const roles = pgTable('roles', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 256 }).unique().notNull(),
    created_at: timestamp('created_at').defaultNow()
});

export const companies = pgTable('companies', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 256 }).unique().notNull(),
    created_at: timestamp('created_at').defaultNow(),
    address: json('address'),
    billing_address: json('billing_address'),
    created_by: uuid('created_by').unique(),
    approved: boolean('approved'),
    trial_end_date: date('trial_end_date')
});