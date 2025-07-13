const ITERATIONS = 100000;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const KEY_LENGTH = 256;
const KEY_ALGORITHM = "PBKDF2";
const CIPHER_ALGORITHM = "AES-GCM";
const HASH_ALGORITHM = "SHA-256";

export async function encryptWhim(
  message: string,
  otp: string
): Promise<EncryptedWhim> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(otp),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    key,
    { name: CIPHER_ALGORITHM, length: KEY_LENGTH },
    false,
    ["encrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: CIPHER_ALGORITHM,
      iv,
    },
    derivedKey,
    encoder.encode(message)
  );

  return {
    encryptedMessage: new Uint8Array(encryptedData),
    salt,
    iv,
  };
}

export async function decryptWhim(
  encryptedWhim: EncryptedWhim,
  otp: string
): Promise<string> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(otp),
    { name: KEY_ALGORITHM },
    false,
    ["deriveKey"]
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: KEY_ALGORITHM,
      salt: encryptedWhim.salt,
      iterations: ITERATIONS,
      hash: HASH_ALGORITHM,
    },
    key,
    { name: CIPHER_ALGORITHM, length: KEY_LENGTH },
    false,
    ["decrypt"]
  );

  const decryptedData = await crypto.subtle.decrypt(
    {
      name: CIPHER_ALGORITHM,
      iv: encryptedWhim.iv,
    },
    derivedKey,
    encryptedWhim.encryptedMessage
  );

  return decoder.decode(decryptedData);
}

export function generateOtp(): string {
  const randomValue = crypto.getRandomValues(new Uint32Array(1))[0];
  return (randomValue % 9000 + 1000).toString();
}

type EncryptedWhim = {
  encryptedMessage: Uint8Array;
  salt: Uint8Array;
  iv: Uint8Array;
};
