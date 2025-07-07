import { StartClient } from "@tanstack/react-start";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createRouter } from "./router";

import * as Sentry from "@sentry/tanstackstart-react";

const router = createRouter();

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
});

hydrateRoot(
  document,
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>
);
