import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db";
import { eq } from "drizzle-orm";
import { stats } from "~/lib/db/schema";

export const getStats = createServerFn({ method: "GET" }).handler(async () => {
  const [latestStats] = await db
    .select({
      whimsCreated: stats.whimsCreated,
      secretsVanished: stats.secretsVanished,
    })
    .from(stats)
    .where(eq(stats.id, 1))
    .limit(1);

  if (!latestStats) {
    return {
      whimsCreated: 0,
      secretsVanished: 0,
    };
  }

  return latestStats;
});
