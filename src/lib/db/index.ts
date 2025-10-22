import { drizzle } from "drizzle-orm/libsql";
import { EnhancedQueryLogger } from "drizzle-query-logger";
import { env } from "~/config/env";

export const db = drizzle(env.DATABASE_URL, {
  casing: "snake_case",
  logger: new EnhancedQueryLogger(),
});
