import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { db } from "~/lib/db";
import { attempts, stats, whims } from "~/lib/db/schema";

const deleteWhimSchema = z.object({
  id: z.string(),
});

export const deleteWhim = createServerFn({ method: "POST" })
  .validator(deleteWhimSchema)
  .handler(async ({ data: { id } }) => {
    await db.transaction(
      async tx => {
        await tx.delete(whims).where(eq(whims.id, id));

        await tx.delete(attempts).where(eq(attempts.whimId, id));

        await tx
          .update(stats)
          .set({
            secretsVanished: sql`${stats.secretsVanished} + 1`,
          })
          .where(eq(stats.id, 1));
      },
      { behavior: "immediate" }
    );

    return { success: true };
  });
