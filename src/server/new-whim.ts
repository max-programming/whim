import { createServerFn } from "@tanstack/react-start";
import { nanoid } from "nanoid";
import { z } from "zod";
import { db } from "~/lib/db";
import { stats, whims } from "~/lib/db/schema";
import { encryptWhim, generateOtp } from "~/lib/crypto-utils";
import { eq, sql } from "drizzle-orm";

const newWhimSchema = z.object({
  message: z.string().min(1),
});

export const newWhim = createServerFn({ method: "POST" })
  .validator(newWhimSchema)
  .handler(async ({ data: { message } }) => {
    const whimId = nanoid(6);
    const otp = generateOtp();

    const { encryptedMessage, salt, iv, authTag } = encryptWhim(message, otp);

    await db.insert(whims).values({
      id: whimId,
      encryptedMessage,
      salt,
      iv,
      authTag,
    });

    await db
      .update(stats)
      .set({
        whimsCreated: sql`${stats.whimsCreated} + 1`,
      })
      .where(eq(stats.id, 1));

    return {
      id: whimId,
      otp,
    };
  });
