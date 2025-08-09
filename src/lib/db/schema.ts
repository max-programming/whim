import { sql } from "drizzle-orm";
import { check, sqliteTable } from "drizzle-orm/sqlite-core";

export const whims = sqliteTable("whims", t => ({
  id: t.text().primaryKey(),
  encryptedMessage: t.blob({ mode: "buffer" }).notNull(),
  salt: t.blob({ mode: "buffer" }).notNull(),
  iv: t.blob({ mode: "buffer" }).notNull(),
  createdAt: t.integer({ mode: "timestamp" }).default(sql`current_timestamp`),
}));

export const attempts = sqliteTable("attempts", t => ({
  whimId: t
    .text()
    .primaryKey()
    .references(() => whims.id, { onDelete: "cascade" }),
  failedAttempts: t.integer().default(0).notNull(),
  lastAttemptAt: t
    .integer({ mode: "timestamp" })
    .default(sql`current_timestamp`)
    .notNull(),
}));

export const stats = sqliteTable(
  "stats",
  t => ({
    id: t.integer().primaryKey().default(1),
    whimsCreated: t.integer().default(0).notNull(),
    secretsVanished: t.integer().default(0).notNull(),
    lastUpdated: t
      .integer({ mode: "timestamp" })
      .default(sql`current_timestamp`),
  }),
  table => [check("single_row_check", sql`${table.id} = 1`)]
);

export type Attempts = typeof attempts.$inferSelect;
export type Stats = typeof stats.$inferSelect;
export type Whim = typeof whims.$inferSelect;
