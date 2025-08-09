import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { stats } from "~/lib/db/schema";

export const getStats = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const [latestStats] = await db
      .select({
        whimsCreated: stats.whimsCreated,
        secretsVanished: stats.secretsVanished,
      })
      .from(stats)
      .where(eq(stats.id, 1))
      .limit(1);

    return latestStats;
  } catch (error) {
    console.error(error);
    return {
      whimsCreated: 0,
      secretsVanished: 0,
    };
  }
});
