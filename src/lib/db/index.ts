import { drizzle } from "drizzle-orm/libsql";

const dbUrl = process.env.DATABASE_URL!;
export const db = drizzle(dbUrl, { casing: "snake_case" });
