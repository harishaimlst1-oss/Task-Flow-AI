import { pool } from "../config/db";
import { env } from "../config/env";

export const scheduleDeletion = async (userId: string, reason: string) => {
  await pool.query(
    `INSERT INTO deletion_requests (user_id, reason, scheduled_for)
     VALUES ($1, $2, NOW() + ($3 || ' days')::interval)` ,
    [userId, reason, env.retentionDays]
  );
};

export const purgeExpiredData = async () => {
  await pool.query(
    `DELETE FROM encrypted_resumes
     WHERE user_id IN (
       SELECT user_id FROM deletion_requests WHERE scheduled_for <= NOW()
     )`
  );
  await pool.query(
    `DELETE FROM oauth_tokens
     WHERE user_id IN (
       SELECT user_id FROM deletion_requests WHERE scheduled_for <= NOW()
     )`
  );
  await pool.query(
    `DELETE FROM users WHERE id IN (
      SELECT user_id FROM deletion_requests WHERE scheduled_for <= NOW()
    )`
  );
};
