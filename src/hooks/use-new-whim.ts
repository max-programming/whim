import { useMutation } from "@tanstack/react-query";
import { newWhim } from "~/server/new-whim";

export function useNewWhim() {
  return useMutation({
    mutationFn: newWhim,
  });
}
