import { setThemeServerFn } from "~/server/theme";
import { createContext, use } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { themeQuery } from "~/lib/queries";

export type Theme = "light" | "dark";

type ThemeContextVal = { theme: Theme; setTheme: (val: Theme) => void };

const ThemeContext = createContext<ThemeContextVal | null>(null);

export function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: theme } = useSuspenseQuery(themeQuery);
  const queryClient = useQueryClient();

  function setTheme(val: Theme) {
    queryClient.setQueryData(themeQuery.queryKey, val);
    setThemeServerFn({ data: val });
  }

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const val = use(ThemeContext);
  if (!val) throw new Error("useTheme called outside of ThemeProvider!");
  return val;
}
