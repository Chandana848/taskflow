export const ROLE_LEVELS: Record<string, number> = {
  OWNER: 40,
  ADMIN: 30,
  MEMBER: 20,
  VIEWER: 10
};

export function canManageRole(actorRole: string, targetRole: string): boolean {
  const actorLevel = ROLE_LEVELS[actorRole.toUpperCase()] || 0;
  const targetLevel = ROLE_LEVELS[targetRole.toUpperCase()] || 0;
  return actorLevel > targetLevel;
}

export function isRoleAtLeast(userRole: string, requiredRole: string): boolean {
  const userLevel = ROLE_LEVELS[userRole.toUpperCase()] || 0;
  const reqLevel = ROLE_LEVELS[requiredRole.toUpperCase()] || 0;
  return userLevel >= reqLevel;
}
