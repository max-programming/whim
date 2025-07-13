import { useMutation } from "@tanstack/react-query";
import { encryptWhim, generateOtp } from "~/lib/crypto-utils";
import { newWhim } from "~/server/new-whim";

export function useNewWhim() {
  return useMutation({
    async mutationFn({ message }: { message: string }) {
      const otp = generateOtp();
      const encryptedWhim = await encryptWhim(message, otp);

      const result = await newWhim({
        data: {
          encryptedMessage: Array.from(encryptedWhim.encryptedMessage),
          salt: Array.from(encryptedWhim.salt),
          iv: Array.from(encryptedWhim.iv),
        },
      });

      return {
        ...result,
        otp,
      };
    },
  });
}
