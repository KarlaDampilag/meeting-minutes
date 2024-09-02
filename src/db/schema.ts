import { relations, sql } from "drizzle-orm";
import { boolean, date, decimal, integer, interval, jsonb, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

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
type Address = {
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
export type Property = typeof properties.$inferSelect;
export type PropertyWithManager = Property & { propertyManager: User }
export type Owner = typeof owners.$inferSelect;
export type Supplier = typeof suppliers.$inferSelect;
export type Meeting = typeof meetings.$inferSelect;
export type AgendaItem = typeof agendaItems.$inferSelect;
export type MeetingWithProperty = Meeting & { property: Property }
export type MeetingWithPropertyAngAgendaItems = MeetingWithProperty & { agendaItems: AgendaItem[] }

export const roles = pgTable('roles', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 256 }).unique().notNull(),
    created_at: timestamp('created_at').defaultNow()
});

export const companies = pgTable('companies', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 256 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    address: jsonb('address').$type<Address>(),
    billing_address: jsonb('billing_address').$type<Address>(),
    logo: varchar('logo', { length: 256 }),
    website: varchar('website', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull(),
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

export const properties = pgTable('properties', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    company_id: uuid('company_id').references(() => companies.id).notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    address: jsonb('address').$type<Address>(),
    property_manager_id: uuid('property_manager_id').references(() => users.id).notNull(),
    total_ownership_shares: integer('total_ownership_shares')
});

export const propertiesRelations = relations(properties, ({ one, many }) => ({
    propertyManager: one(users, {
        fields: [properties.property_manager_id],
        references: [users.id]
    }),
    meetings: many(meetings, { relationName: 'propertyMeetings' })
}))

export const owners = pgTable('owners', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    first_name: varchar('first_name', { length: 256 }).notNull(),
    last_name: varchar('last_name', { length: 256 }).notNull(),
    telephone: varchar('telephone', { length: 256 }),
    email: varchar('email', { length: 256 }).notNull(),
    ownership_share: decimal('ownership_share'),
    property_id: uuid('property_id').references(() => properties.id).notNull(),
    address: jsonb('address').$type<Address>(),
});

export const suppliers = pgTable('suppliers', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 256 }).notNull(),
    telephone: varchar('telephone', { length: 256 }),
    email: varchar('email', { length: 256 }),
    service: decimal('service').notNull(),
    property_id: uuid('property_id').references(() => properties.id).notNull(),
});

export const meetings = pgTable('meetings', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 256 }).notNull(),
    property_id: uuid('property_id').references(() => properties.id).notNull(),
    date: timestamp('date').notNull(),
    duration: interval('duration').notNull(),
    location: varchar('location').notNull(),
    created_at: timestamp('created_at').defaultNow()
});

export const meetingsRelations = relations(meetings, ({ one, many }) => ({
    property: one(properties, {
        fields: [meetings.property_id],
        references: [properties.id],
        relationName: 'propertyMeetings'
    }),
    agendaItems: many(agendaItems, { relationName: 'meetingAgendaItems' })
}))

export const agendaItems = pgTable('agendaItems', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 256 }).notNull(),
    meeting_id: uuid('meeting_id').references(() => meetings.id).notNull(),
    description: text('description'),
    created_at: timestamp('created_at').defaultNow()
});

export const agendaItemsRelations = relations(agendaItems, ({ one }) => ({
    meeting: one(meetings, {
        fields: [agendaItems.meeting_id],
        references: [meetings.id],
        relationName: 'meetingAgendaItems'
    })
}))
