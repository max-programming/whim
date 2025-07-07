import {
  createMiddleware,
  registerGlobalMiddleware,
} from "@tanstack/react-start";
import * as Sentry from "@sentry/tanstackstart-react";

registerGlobalMiddleware({
  middleware: [
    createMiddleware({ type: "function" }).server(
      Sentry.sentryGlobalServerMiddlewareHandler()
    ),
  ],
});
