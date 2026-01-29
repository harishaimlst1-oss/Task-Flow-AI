import { pool } from "../config/db";
import { env } from "../config/env";
import { decrypt, encrypt } from "../utils/encryption";

export const saveEncryptedResume = async (userId: string, resume: string) => {
  const encrypted = encrypt(resume, env.aesKey);
  await pool.query(
    `INSERT INTO encrypted_resumes (user_id, payload) VALUES ($1, $2)
     ON CONFLICT (user_id) DO UPDATE SET payload = $2, updated_at = NOW()` ,
    [userId, encrypted]
  );
};

export const getEncryptedResume = async (userId: string) => {
  const result = await pool.query(
    "SELECT payload FROM encrypted_resumes WHERE user_id = $1",
    [userId]
  );
  if (!result.rows[0]) {
    return null;
  }
  return decrypt(result.rows[0].payload, env.aesKey);
};

export const saveOAuthToken = async (userId: string, provider: string, token: string) => {
  const encrypted = encrypt(token, env.tokenKey);
  await pool.query(
    `INSERT INTO oauth_tokens (user_id, provider, token_payload)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, provider) DO UPDATE SET token_payload = $3, updated_at = NOW()` ,
    [userId, provider, encrypted]
  );
};
