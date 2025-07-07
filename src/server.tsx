import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { createRouter } from "./router";

import * as Sentry from "@sentry/tanstackstart-react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
});

export default createStartHandler({
  createRouter,
})(Sentry.wrapStreamHandlerWithSentry(defaultStreamHandler));
