export async function encryptWhim(
  message: string,
  otp: string
): Promise<EncryptedWhim> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));

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
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
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
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encryptedWhim.salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    key,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: encryptedWhim.iv,
    },
    derivedKey,
    encryptedWhim.encryptedMessage
  );

  return decoder.decode(decryptedData);
}

export function generateOtp(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

type EncryptedWhim = {
  encryptedMessage: Uint8Array;
  salt: Uint8Array;
  iv: Uint8Array;
};
