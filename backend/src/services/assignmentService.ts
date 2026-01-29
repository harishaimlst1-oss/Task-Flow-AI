import { pool } from "../config/db";

export type MatchResult = {
  userId: string;
  score: number;
  rationale: string;
};

export const selectAssignee = async (taskId: string): Promise<MatchResult | null> => {
  const result = await pool.query(
    `SELECT user_id, score, rationale
     FROM ai_attempts
     WHERE task_id = $1
     ORDER BY score DESC
     LIMIT 1`,
    [taskId]
  );
  return result.rows[0] ?? null;
};

export const applySkillLearning = async (userId: string, skillId: string, delta: number) => {
  await pool.query(
    `INSERT INTO skill_history (user_id, skill_id, delta, source)
     VALUES ($1, $2, $3, 'adaptive-learning')`,
    [userId, skillId, delta]
  );
};

export const predictEta = async (taskId: string): Promise<number> => {
  const result = await pool.query(
    `SELECT eta_hours FROM tasks WHERE id = $1`,
    [taskId]
  );
  return result.rows[0]?.eta_hours ?? 0;
};
