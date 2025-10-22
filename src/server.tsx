import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import * as Sentry from "@sentry/tanstackstart-react";
import { createRouter } from "./router";
import { env } from "./config/env";

Sentry.init({
  dsn: env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
});

export default createStartHandler({
  createRouter,
})(Sentry.wrapStreamHandlerWithSentry(defaultStreamHandler));
