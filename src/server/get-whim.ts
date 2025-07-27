import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "~/lib/db";
import { eq, getTableColumns } from "drizzle-orm";
import { attempts, whims } from "~/lib/db/schema";

const getWhimSchema = z.object({
  id: z.string(),
});

export const getWhim = createServerFn({ method: "GET" })
  .validator(getWhimSchema)
  .handler(async ({ data: { id } }) => {
    const [result] = await db
      .select({
        whim: getTableColumns(whims),
        attempt: getTableColumns(attempts),
      })
      .from(whims)
      .leftJoin(attempts, eq(attempts.whimId, whims.id))
      .where(eq(whims.id, id))
      .limit(1);

    if (!result) {
      throw new Error("Whim does not exist");
    }

    const { whim, attempt } = result;

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000);

    let currentAttempt = attempt;

    if (attempt) {
      // Check if whim has already been successfully accessed max times
      if (attempt.successfulAttempts >= whim.maxAttempts) {
        throw new Error(
          "This whim has already been accessed the maximum number of times"
        );
      }

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
      // Create new attempt record
      await db.insert(attempts).values({
        whimId: id,
        failedAttempts: 0,
        successfulAttempts: 0,
        lastAttemptAt: now,
      });

      // Fetch the newly created attempt record
      const [newAttempt] = await db
        .select()
        .from(attempts)
        .where(eq(attempts.whimId, id))
        .limit(1);
      currentAttempt = newAttempt;
    }

    return {
      encryptedMessage: Array.from(whim.encryptedMessage),
      salt: Array.from(whim.salt),
      iv: Array.from(whim.iv),
      maxAttempts: whim.maxAttempts,
      remainingAttempts:
        whim.maxAttempts - (currentAttempt?.successfulAttempts || 0),
    };
  });
