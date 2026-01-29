import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "",
  aesKey: process.env.AES_GCM_KEY ?? "",
  tokenKey: process.env.TOKEN_ENCRYPTION_KEY ?? "",
  retentionDays: Number(process.env.RETENTION_DAYS ?? 365)
};
