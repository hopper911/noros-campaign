import { customType, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import type { SiteContent } from "@/lib/site-content";

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const siteContent = pgTable("site_content", {
  id: text("id").primaryKey(),
  document: jsonb("document").$type<SiteContent>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const media = pgTable("media", {
  id: uuid("id").primaryKey().defaultRandom(),
  kind: text("kind").notNull(),
  mime: text("mime").notNull(),
  bytes: bytea("bytes").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
