import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env.mjs";

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle(client);

export const takeUniqueOrThrow = <T extends unknown[]>(
  values: T,
): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0]!;
};
