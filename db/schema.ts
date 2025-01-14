import { sql } from "drizzle-orm";

import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("users", {
  id: varchar("id", { length: 128 }).$defaultFn(() => createId()),
  email: text("email").unique().notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
});
