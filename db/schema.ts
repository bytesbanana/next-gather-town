import { sql } from "drizzle-orm";

import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("users", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  email: text("email").unique().notNull(),
  image: text("image").notNull(),
  username: text("username").notNull(),
  character: text("character"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
});

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
});
