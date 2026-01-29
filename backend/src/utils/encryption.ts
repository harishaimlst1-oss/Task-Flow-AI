import crypto from "crypto";

const algorithm = "aes-256-gcm";

const getKey = (key: string) => {
  const buffer = Buffer.from(key, "base64");
  if (buffer.length !== 32) {
    throw new Error("AES-256-GCM key must be 32 bytes base64-encoded.");
  }
  return buffer;
};

type EncryptedPayload = {
  iv: string;
  tag: string;
  ciphertext: string;
};

export const encrypt = (plaintext: string, key: string): EncryptedPayload => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, getKey(key), iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: ciphertext.toString("base64")
  };
};

export const decrypt = (payload: EncryptedPayload, key: string): string => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    getKey(key),
    Buffer.from(payload.iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(payload.tag, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(payload.ciphertext, "base64")),
    decipher.final()
  ]);

  return plaintext.toString("utf8");
};
