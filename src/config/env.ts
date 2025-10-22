import { createIsomorphicFn } from "@tanstack/react-start";
import { z } from "zod";

const clientEnvSchema = z.object({
  VITE_SENTRY_DSN: z.string().optional(),
  VITE_ANALYTICS_SCRIPT: z.url().optional(),
  VITE_ANALYTICS_WEBSITE_ID: z.uuid().optional(),
});

const serverEnvSchema = z
  .object({ DATABASE_URL: z.url() })
  .and(clientEnvSchema);

const getEnv = createIsomorphicFn()
  .server(() => serverEnvSchema.parse(process.env))
  .client(() => clientEnvSchema.parse(import.meta.env));

type Env = z.infer<typeof serverEnvSchema>;

export const env = getEnv() as Env;
