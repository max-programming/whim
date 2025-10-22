import { StartClient } from "@tanstack/react-start";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import * as Sentry from "@sentry/tanstackstart-react";
import { createRouter } from "./router";
import { env } from "./config/env";

const router = createRouter();

Sentry.init({
  dsn: env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
});

hydrateRoot(
  document,
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>,
);
