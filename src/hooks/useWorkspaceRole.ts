import { useAuth } from './useAuth';
import { hasPermission, type Permission, type Role } from '@/lib/auth/rbac';

export function useWorkspaceRole(workspaceRole?: Role) {
  const { user } = useAuth();
  const activeRole: Role = workspaceRole || (user?.role as Role) || 'VIEWER';

  return {
    role: activeRole,
    can: (permission: Permission) => hasPermission(activeRole, permission),
    isOwner: activeRole === 'OWNER',
    isAdmin: activeRole === 'ADMIN' || activeRole === 'OWNER',
  };
}
