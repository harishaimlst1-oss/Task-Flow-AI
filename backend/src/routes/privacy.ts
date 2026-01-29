import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requirePermission } from "../middleware/rbac";
import { scheduleDeletion } from "../services/gdprService";
import { recordAudit } from "../services/auditService";

const router = Router();

router.use(authenticate);

router.post("/delete", requirePermission("user:manage"), async (req, res) => {
  const { userId, reason } = req.body as { userId: string; reason: string };
  await scheduleDeletion(userId, reason ?? "user-request");
  await recordAudit(req.user!.orgId, req.user!.sub, "privacy.delete_request", {
    userId,
    reason
  });
  res.json({ status: "scheduled" });
});

export default router;
