import { useQuery } from "@tanstack/react-query";
import { getAndDeleteWhim } from "~/server/get-and-delete-whim";

export function useGetWhim(id: string, otp: string) {
  return useQuery({
    queryKey: ["whim", id],
    queryFn: ({ queryKey: [, id] }) =>
      getAndDeleteWhim({
        data: {
          id,
          otp,
        },
      }),
    enabled: !!id && !!otp,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
