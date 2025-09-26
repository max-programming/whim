// import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  dialect: "sqlite",
  dbCredentials: { url: dbUrl },
  casing: "snake_case",
  out: "./src/lib/db/migrations",
  schema: "./src/lib/db/schema.ts",
});
