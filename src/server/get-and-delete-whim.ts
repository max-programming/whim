import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/lib/db";
import { attempts, stats, whims } from "~/lib/db/schema";
import { decryptWhim } from "~/lib/crypto-utils";

const getAndDeleteWhimSchema = z.object({
  id: z.string(),
  otp: z.string().length(4),
});

export const getAndDeleteWhim = createServerFn({ method: "GET" })
  .validator(getAndDeleteWhimSchema)
  .handler(async ({ data: { id, otp } }) => {
    const [attempt] = await db
      .select()
      .from(attempts)
      .where(eq(attempts.whimId, id))
      .limit(1);

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000);

    if (attempt) {
      if (attempt.failedAttempts >= 3 && attempt.lastAttemptAt > oneHourAgo) {
        throw new Error("Too many failed attempts. Try again later");
      }

      if (attempt.lastAttemptAt <= oneHourAgo) {
        await db
          .update(attempts)
          .set({ failedAttempts: 0, lastAttemptAt: now })
          .where(eq(attempts.whimId, id));
      }
    } else {
      try {
        await db.insert(attempts).values({
          whimId: id,
          failedAttempts: 0,
          lastAttemptAt: now,
        });
      } catch (error) {
        throw new Error("Whim does not exist");
      }
    }

    try {
      const message = await db.transaction(
        async tx => {
          const [whim] = await tx
            .select()
            .from(whims)
            .where(eq(whims.id, id))
            .limit(1);

          if (!whim) {
            throw new Error("Whim does not exist");
          }

          const decryptedWhim = decryptWhim(whim, otp);

          await tx.delete(whims).where(eq(whims.id, id));
          await tx.delete(attempts).where(eq(attempts.whimId, id));

          await tx
            .update(stats)
            .set({
              secretsVanished: sql`${stats.secretsVanished} + 1`,
            })
            .where(eq(stats.id, 1));

          return decryptedWhim;
        },
        { behavior: "immediate" }
      );

      return { message };
    } catch (error) {
      await db
        .insert(attempts)
        .values({
          whimId: id,
          failedAttempts: 0,
          lastAttemptAt: new Date(),
        })
        .onConflictDoUpdate({
          target: attempts.whimId,
          set: {
            failedAttempts: sql`${attempts.failedAttempts} + 1`,
            lastAttemptAt: new Date(),
          },
        });

      throw new Error("Invalid OTP");
    }
  });
