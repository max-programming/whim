import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "~/lib/db";
import { eq } from "drizzle-orm";
import { attempts, whims } from "~/lib/db/schema";

const getWhimSchema = z.object({
  id: z.string(),
});

export const getWhim = createServerFn({ method: "GET" })
  .validator(getWhimSchema)
  .handler(async ({ data: { id } }) => {
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

    const [whim] = await db
      .select()
      .from(whims)
      .where(eq(whims.id, id))
      .limit(1);

    if (!whim) {
      throw new Error("Whim does not exist");
    }

    return {
      encryptedMessage: Array.from(whim.encryptedMessage),
      salt: Array.from(whim.salt),
      iv: Array.from(whim.iv),
    };
  });
