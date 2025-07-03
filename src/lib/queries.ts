import { queryOptions } from "@tanstack/react-query";
import { getStats } from "~/server/get-stats";

export const statsQuery = queryOptions({
  queryKey: ["stats"],
  queryFn: getStats,
});
