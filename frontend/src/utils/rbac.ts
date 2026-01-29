import type { Role } from "../store/authStore";

const rolePermissions: Record<Role, string[]> = {
  owner: ["org:manage", "team:manage", "user:manage", "task:assign", "audit:view"],
  admin: ["team:manage", "user:manage", "task:assign", "audit:view"],
  manager: ["task:assign", "audit:view"],
  member: ["task:view", "task:update"],
  viewer: ["task:view"]
};

export const hasPermission = (role: Role, permission: string): boolean => {
  return rolePermissions[role]?.includes(permission) ?? false;
};
