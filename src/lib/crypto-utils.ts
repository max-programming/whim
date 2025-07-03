import crypto from "node:crypto";
import type { Whim } from "./db/schema";

export function encryptWhim(message: string, otp: string): EncryptedWhim {
  const salt = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(otp, salt, 100_000, 32, "sha256");

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  let encryptedMessageBuffer = cipher.update(message, "utf8");
  encryptedMessageBuffer = Buffer.concat([
    encryptedMessageBuffer,
    cipher.final(),
  ]);

  return {
    encryptedMessage: encryptedMessageBuffer,
    salt,
    iv,
    authTag: cipher.getAuthTag(),
  };
}

export function decryptWhim(whim: Whim, otp: string): string {
  const key = crypto.pbkdf2Sync(otp, whim.salt, 100_000, 32, "sha256");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, whim.iv);

  decipher.setAuthTag(whim.authTag);

  let decryptedMessageBuffer = decipher.update(whim.encryptedMessage);
  decryptedMessageBuffer = Buffer.concat([
    decryptedMessageBuffer,
    decipher.final(),
  ]);

  return decryptedMessageBuffer.toString("utf8");
}

export function generateOtp(): string {
  return crypto.randomInt(1000, 10000).toString();
}

type EncryptedWhim = {
  encryptedMessage: Buffer;
  salt: Buffer;
  iv: Buffer;
  authTag: Buffer;
};
