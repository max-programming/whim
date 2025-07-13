import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/lib/db";
import { attempts } from "~/lib/db/schema";

const incrementFailedAttemptsSchema = z.object({
  id: z.string(),
});

export const incrementFailedAttempts = createServerFn({ method: "POST" })
  .validator(incrementFailedAttemptsSchema)
  .handler(async ({ data: { id } }) => {
    await db
      .insert(attempts)
      .values({
        whimId: id,
        failedAttempts: 1,
        lastAttemptAt: new Date(),
      })
      .onConflictDoUpdate({
        target: attempts.whimId,
        set: {
          failedAttempts: sql`${attempts.failedAttempts} + 1`,
          lastAttemptAt: new Date(),
        },
      });

    return { success: true };
  });
