import { pool } from "../config/db";

export const recordAudit = async (
  orgId: string,
  actorId: string,
  action: string,
  metadata: Record<string, unknown>
) => {
  await pool.query(
    `INSERT INTO audit_logs (org_id, actor_id, action, metadata)
     VALUES ($1, $2, $3, $4)` ,
    [orgId, actorId, action, metadata]
  );
};
