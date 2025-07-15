import { useQuery } from "@tanstack/react-query";
import { getWhim } from "~/server/get-whim";
import { deleteWhim } from "~/server/delete-whim";
import { incrementFailedAttempts } from "~/server/increment-failed-attempts";
import { decryptWhim } from "~/lib/crypto-utils";

export function useGetWhim(id: string, otp: string) {
  return useQuery({
    queryKey: ["whim", id],
    async queryFn({ queryKey: [, id] }) {
      let encryptedWhim;

      try {
        encryptedWhim = await getWhim({ data: { id } });
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("Too many failed attempts")
        ) {
          throw error;
        }
        throw new Error("Failed to fetch whim. Please try again.");
      }

      try {
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
          return { message: decryptedMessage, deletionFailed: false };
        } catch (deleteError) {
          console.error("Failed to delete whim:", deleteError);

          return {
            message: decryptedMessage,
            deletionFailed: true,
            warning: "Secret was decrypted but may still exist on server",
          };
        }
      } catch (decryptError) {
        if (isDecryptionError(decryptError)) {
          try {
            await incrementFailedAttempts({ data: { id } });
          } catch (incrementError) {
            console.error(
              "Failed to increment failed attempts:",
              incrementError
            );
          }

          throw new Error("Invalid OTP. Please check your code and try again.");
        }

        console.error("Unexpected decryption error:", decryptError);
        throw new Error("Unable to decrypt whim. The data may be corrupted.");
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

function isDecryptionError(error: unknown): boolean {
  if (error instanceof DOMException) {
    return (
      error.name === "OperationError" || error.name === "InvalidAccessError"
    );
  }

  if (error instanceof Error) {
    return (
      error.message.toLowerCase().includes("decrypt") ||
      error.message.toLowerCase().includes("invalid") ||
      error.message.toLowerCase().includes("authentication")
    );
  }

  return false;
}
