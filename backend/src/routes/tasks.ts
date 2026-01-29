import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requirePermission } from "../middleware/rbac";
import { selectAssignee, predictEta } from "../services/assignmentService";
import { recordAudit } from "../services/auditService";

const router = Router();

router.use(authenticate);

router.get("/:id/eta", requirePermission("task:view"), async (req, res) => {
  const eta = await predictEta(req.params.id);
  await recordAudit(req.user!.orgId, req.user!.sub, "task.eta_view", {
    taskId: req.params.id
  });
  res.json({ etaHours: eta });
});

router.post("/:id/assign", requirePermission("task:assign"), async (req, res) => {
  const match = await selectAssignee(req.params.id);
  await recordAudit(req.user!.orgId, req.user!.sub, "task.assign", {
    taskId: req.params.id,
    match
  });
  res.json({ match });
});

export default router;
