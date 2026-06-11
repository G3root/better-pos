import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: t.text("id").primaryKey(),
  name: t.text("name").notNull(),
  email: t.text("email").notNull().unique(),
  emailVerified: t.boolean("email_verified").default(false).notNull(),
  image: t.text("image"),
  role: t.text("role"),
  banned: t.boolean("banned"),
  banReason: t.text("ban_reason"),
  banExpires: t.timestamp("ban_expires", { precision: 6, withTimezone: true }),
  createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).defaultNow().notNull(),
  updatedAt: t
    .timestamp("updated_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  onBoardedOn: t.timestamp("onboarded_on", { precision: 6, withTimezone: true }),
});

export const session = pgTable(
  "session",
  {
    id: t.text("id").primaryKey(),
    expiresAt: t.timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
    token: t.text("token").notNull().unique(),
    impersonatedBy: t.text("impersonated_by"),
    activeOrganizationId: t.text("active_organization_id"),
    activeTeamId: t.text("active_team_id"),
    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 6, withTimezone: true })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: t.text("ip_address"),
    userAgent: t.text("user_agent"),
    userId: t
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [t.index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: t.text("id").primaryKey(),
    accountId: t.text("account_id").notNull(),
    providerId: t.text("provider_id").notNull(),
    userId: t
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: t.text("access_token"),
    refreshToken: t.text("refresh_token"),
    idToken: t.text("id_token"),
    accessTokenExpiresAt: t.timestamp("access_token_expires_at", {
      precision: 6,
      withTimezone: true,
    }),
    refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at", {
      precision: 6,
      withTimezone: true,
    }),
    scope: t.text("scope"),
    password: t.text("password"),
    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 6, withTimezone: true })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [t.index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: t.text("id").primaryKey(),
    identifier: t.text("identifier").notNull(),
    value: t.text("value").notNull(),
    expiresAt: t.timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [t.index("verification_identifier_idx").on(table.identifier)],
);

export const organization = pgTable("organization", {
  id: t.text("id").primaryKey(),
  name: t.text("name").notNull(),
  slug: t.varchar("slug", { length: 255 }).notNull().unique(),
  logo: t.text("logo"),
  metadata: t.text("metadata"),

  taxId: t.text("tax_id"),
  website: t.text("website"),

  currency: t.varchar("currency", { length: 3 }).notNull().default("USD"),
  currencySymbol: t.varchar("currency_symbol", { length: 10 }).default("$"),
  currencyPosition: t.varchar("currency_position", { length: 10 }).notNull().default("prefix"),
  locale: t.varchar("locale", { length: 10 }).notNull().default("en-US"),
  timezone: t.varchar("timezone", { length: 50 }).notNull().default("UTC"),

  priceIncludesTax: t.boolean("price_includes_tax").default(false).notNull(),
  roundingPrecision: t.integer("rounding_precision").default(2).notNull(),
  allowDiscounts: t.boolean("allow_discounts").default(true).notNull(),
  defaultLowStockThreshold: t.integer("default_low_stock_threshold").default(10).notNull(),

  createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
  updatedAt: t
    .timestamp("updated_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const member = pgTable("member", {
  id: t.text("id").primaryKey(),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  organizationId: t
    .text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  role: t.text("role").notNull(),
  createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
});

export const invitation = pgTable("invitation", {
  id: t.text("id").primaryKey(),
  email: t.text("email").notNull(),
  inviterId: t
    .text("inviter_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  organizationId: t
    .text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  role: t.text("role"),
  status: t.text("status").notNull(),
  teamId: t.text("team_id"),
  createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
  expiresAt: t.timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
});

export const team = pgTable("team", {
  id: t.text("id").primaryKey(),
  name: t.text("name").notNull(),
  organizationId: t
    .text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
  updatedAt: t.timestamp("updated_at", { precision: 6, withTimezone: true }),
});

export const teamMember = pgTable("team_member", {
  id: t.text("id").primaryKey(),
  teamId: t
    .text("team_id")
    .notNull()
    .references(() => team.id, { onDelete: "cascade" }),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }),
});

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
