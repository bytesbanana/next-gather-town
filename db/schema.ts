import { sql } from "drizzle-orm";

import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("users", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  email: text("email").unique().notNull(),
  image: text("image").notNull(),
  username: text("username").notNull(),
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

export const usersToRooms = pgTable(
  "users_join_rooms",
  {
    userId: varchar("user_id", { length: 128 }).notNull(),
    roomId: integer("room_id"),
  },
  (table) => [
    {
      pk: primaryKey({
        columns: [table.userId, table.roomId],
      }),
    },
  ],
);
