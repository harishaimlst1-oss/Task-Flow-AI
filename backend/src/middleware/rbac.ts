import { NextFunction, Request, Response } from "express";

type Role = "owner" | "admin" | "manager" | "member" | "viewer";

const rolePermissions: Record<Role, string[]> = {
  owner: ["org:manage", "team:manage", "user:manage", "task:assign", "audit:view"],
  admin: ["team:manage", "user:manage", "task:assign", "audit:view"],
  manager: ["task:assign", "audit:view"],
  member: ["task:view", "task:update"],
  viewer: ["task:view"]
};

export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role as Role | undefined;
    if (!role) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!rolePermissions[role]?.includes(permission)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    return next();
  };
};
