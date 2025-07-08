import { type Theme } from "~/server/theme";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { themeQuery } from "~/lib/queries";
import { setThemeServerFn } from "~/server/theme";

export function ThemeToggle() {
  const queryClient = useQueryClient();
  const { data: theme } = useSuspenseQuery(themeQuery);

  function setTheme(val: Theme) {
    queryClient.setQueryData(themeQuery.queryKey, val);
    setThemeServerFn({ data: val });
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
}
