import { drizzle } from "drizzle-orm/libsql";
import { EnhancedQueryLogger } from "drizzle-query-logger";

const dbUrl = process.env.DATABASE_URL!;
export const db = drizzle(dbUrl, {
  casing: "snake_case",
  logger: new EnhancedQueryLogger(),
});
