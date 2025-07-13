import { createServerFn } from "@tanstack/react-start";
import { nanoid } from "nanoid";
import { z } from "zod";
import { db } from "~/lib/db";
import { stats, whims } from "~/lib/db/schema";
import { eq, sql } from "drizzle-orm";

const newWhimSchema = z.object({
  encryptedMessage: z.array(z.number()),
  salt: z.array(z.number()),
  iv: z.array(z.number()),
});

export const newWhim = createServerFn({ method: "POST" })
  .validator(newWhimSchema)
  .handler(async ({ data }) => {
    const whimId = nanoid(6);

    await db.insert(whims).values({
      id: whimId,
      encryptedMessage: Buffer.from(data.encryptedMessage),
      salt: Buffer.from(data.salt),
      iv: Buffer.from(data.iv),
    });

    await db
      .update(stats)
      .set({
        whimsCreated: sql`${stats.whimsCreated} + 1`,
      })
      .where(eq(stats.id, 1));

    return { id: whimId };
  });
