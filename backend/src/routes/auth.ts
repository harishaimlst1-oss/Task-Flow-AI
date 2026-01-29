import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env";
import { pool } from "../config/db";
import { recordAudit } from "../services/auditService";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  inviteCode: z.string().length(6)
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const { email, inviteCode } = parsed.data;
  const invite = await pool.query(
    `SELECT invite_codes.id, invite_codes.org_id, invite_codes.role, organizations.domain
     FROM invite_codes
     JOIN organizations ON organizations.id = invite_codes.org_id
     WHERE invite_codes.code = $1 AND invite_codes.revoked_at IS NULL`,
    [inviteCode]
  );

  const row = invite.rows[0];
  const emailDomain = email.split("@")[1];
  if (!row || emailDomain !== row.domain) {
    return res.status(401).json({ error: "Invalid invite" });
  }

  const token = jwt.sign(
    { sub: row.id, email, role: row.role, orgId: row.org_id },
    env.jwtSecret,
    { expiresIn: "8h" }
  );

  await recordAudit(row.org_id, row.id, "auth.login", { email });

  return res.json({ token });
});

export default router;
