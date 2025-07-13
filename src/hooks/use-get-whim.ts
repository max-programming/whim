import { useQuery } from "@tanstack/react-query";
import { getWhim } from "~/server/get-whim";
import { deleteWhim } from "~/server/delete-whim";
import { incrementFailedAttempts } from "~/server/increment-failed-attempts";
import { decryptWhim } from "~/lib/crypto-utils";

export function useGetWhim(id: string, otp: string) {
  return useQuery({
    queryKey: ["whim", id],
    async queryFn({ queryKey: [, id] }) {
      try {
        const encryptedWhim = await getWhim({ data: { id } });

        const decryptedMessage = await decryptWhim(
          {
            encryptedMessage: new Uint8Array(encryptedWhim.encryptedMessage),
            salt: new Uint8Array(encryptedWhim.salt),
            iv: new Uint8Array(encryptedWhim.iv),
          },
          otp
        );

        try {
          await deleteWhim({ data: { id } });
        } catch (deleteError) {
          console.error("Failed to delete whim:", deleteError);

          return {
            message: decryptedMessage,
            deletionFailed: true,
          };
        }

        return { message: decryptedMessage, deletionFailed: false };
      } catch (error) {
        if (error instanceof Error && error.message.includes("decrypt")) {
          await incrementFailedAttempts({ data: { id } });
          throw new Error("Invalid OTP");
        }

        throw error;
      }
    },
    enabled: !!id && !!otp,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
