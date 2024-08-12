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
    }),
    role: one(roles, {
        fields: [users.role_id],
        references: [roles.id]
    })
}));

export type NewUser = typeof users.$inferInsert;
export type NewRole = typeof roles.$inferInsert;
export type NewCompany = typeof companies.$inferInsert;
export type User = typeof users.$inferSelect;
export type Company = typeof companies.$inferSelect;
type CompanyAddress = {
    street: string,
    city: string,
    state?: string,
    zipCode: string,
    country: string,
    telephone: string
}
export type UserWithCompany = User & { company: Company | null }
export type CompanyAndSubmittingUser = { companies: Company, users: User | null }
export type Invite = typeof invites.$inferSelect;

export const roles = pgTable('roles', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 256 }).unique().notNull(),
    created_at: timestamp('created_at').defaultNow()
});

export const companies = pgTable('companies', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 256 }).unique().notNull(),
    created_at: timestamp('created_at').defaultNow(),
    address: json('address').$type<CompanyAddress>(),
    billing_address: json('billing_address').$type<CompanyAddress>(),
    created_by: uuid('created_by').unique(),
    approved: boolean('approved'),
    trial_end_date: date('trial_end_date')
});

export const invites = pgTable('invites', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    company_id: uuid('company_id').references(() => companies.id).notNull(),
    invitor_id: uuid('invitor_id').references(() => users.id).notNull(),
    invited_email: varchar('invited_email', { length: 256 }).unique().notNull(),
    accepted: boolean('accepted'),
    role_id: uuid('role_id').references(() => roles.id).notNull(),
    rejected: boolean('rejected')
});

export const invitesRelations = relations(invites, ({ one }) => ({
    role: one(roles, {
        fields: [invites.role_id],
        references: [roles.id]
    })
}));
