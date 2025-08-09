import { queryOptions } from "@tanstack/react-query";
import type { Theme } from "~/server/theme";
import { getStats } from "~/server/get-stats";
import { getThemeServerFn } from "~/server/theme";

export const themeQuery = queryOptions({
  queryKey: ["theme"],
  queryFn: async (): Promise<Theme> => {
    const themeResponse = await getThemeServerFn();
    if (!["light", "dark"].includes(themeResponse)) {
      const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      return theme;
    }
    return themeResponse;
  },
});

export const statsQuery = queryOptions({
  queryKey: ["stats"],
  queryFn: getStats,
});
