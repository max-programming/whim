import { queryOptions } from "@tanstack/react-query";
import { getStats } from "~/server/get-stats";
import { getThemeServerFn } from "~/server/theme";

export const themeQuery = queryOptions({
  queryKey: ["theme"],
  queryFn: () => {
    const theme = getThemeServerFn();
    if (!theme) {
      const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      return theme;
    }
    return theme;
  },
});

export const statsQuery = queryOptions({
  queryKey: ["stats"],
  queryFn: getStats,
});
