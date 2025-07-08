/// <reference types="vite/client" />
import type { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  HeadContent,
  createRootRouteWithContext,
  DefaultGlobalNotFound,
  Scripts,
} from "@tanstack/react-router";
import { wrapCreateRootRouteWithSentry } from "@sentry/tanstackstart-react";
import appCss from "~/styles/app.css?url";
import { seo } from "~/lib/seo";
import { ThemeProvider, useTheme } from "~/components/theme-provider";
import { ThemeToggle } from "~/components/theme-toggle";
import { themeQuery } from "~/lib/queries";

export const Route = wrapCreateRootRouteWithSentry(
  createRootRouteWithContext<{
    queryClient: QueryClient;
  }>()
)({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Whim - The Secret Sharing App",
        description:
          "Whim is a secret sharing app that allows you to share secret messages. The messages are encrypted and are vanished after being read.",
        keywords:
          "secret sharing, secret messages, ephemeral messages, ephemeral sharing, ephemeral messaging, ephemeral sharing app, ephemeral messaging app, one time messages, one time secret sharing, one time secret messaging, one time secret sharing app, one time secret messaging app",
      }),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(themeQuery);
  },
  component: RootComponent,
  notFoundComponent: DefaultGlobalNotFound,
});

function RootComponent() {
  return (
    <ThemeProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ThemeProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  const { theme } = useTheme();

  return (
    <html className={theme} suppressHydrationWarning>
      <head>
        <HeadContent />
        {import.meta.env.VITE_ANALYTICS_SCRIPT &&
          import.meta.env.VITE_ANALYTICS_WEBSITE_ID && (
            <script
              defer
              src={import.meta.env.VITE_ANALYTICS_SCRIPT}
              data-website-id={import.meta.env.VITE_ANALYTICS_WEBSITE_ID}
            ></script>
          )}
      </head>
      <body>
        {children}

        {/* Theme Toggle - Fixed position in top-right corner */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        <Scripts />
      </body>
    </html>
  );
}
