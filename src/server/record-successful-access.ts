import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "~/lib/db";
import { attempts, stats, whims } from "~/lib/db/schema";

const recordSuccessfulAccessSchema = z.object({
  id: z.string(),
});

export const recordSuccessfulAccess = createServerFn({ method: "POST" })
  .validator(recordSuccessfulAccessSchema)
  .handler(async ({ data: { id } }) => {
    return await db.transaction(
      async tx => {
        const results = await tx
          .select({
            whim: getTableColumns(whims),
            attempt: getTableColumns(attempts),
          })
          .from(whims)
          .leftJoin(attempts, eq(attempts.whimId, whims.id))
          .where(eq(whims.id, id))
          .limit(1);

        const result = results[0] as (typeof results)[0] | undefined;

        if (!result) {
          throw new Error("Whim does not exist");
        }

        const { whim, attempt } = result;

        const newSuccessfulAttempts = (attempt?.successfulAttempts || 0) + 1;

        // Update successful attempts
        await tx
          .update(attempts)
          .set({ successfulAttempts: newSuccessfulAttempts })
          .where(eq(attempts.whimId, id));

        // Check if this was the last allowed access
        const shouldDelete = newSuccessfulAttempts >= whim.maxAttempts;

        if (shouldDelete) {
          // Delete the whim and attempts
          await tx.delete(whims).where(eq(whims.id, id));
          await tx.delete(attempts).where(eq(attempts.whimId, id));

          // Update stats
          await tx
            .update(stats)
            .set({
              secretsVanished: sql`${stats.secretsVanished} + 1`,
            })
            .where(eq(stats.id, 1));
        }

        return {
          success: true,
          deleted: shouldDelete,
          remainingAttempts: Math.max(
            0,
            whim.maxAttempts - newSuccessfulAttempts
          ),
        };
      },
      { behavior: "immediate" }
    );
  });
