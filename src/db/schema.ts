import {  pgTable, uuid, text, timestamp , uniqueIndex} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  name: text("name").notNull(),
  //   TODO: add banner field
  imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow().notNull()
}, (t) => [uniqueIndex("clerk_id_idx").on(t.clerkId)]);
