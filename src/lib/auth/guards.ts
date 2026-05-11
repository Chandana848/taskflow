import { ForbiddenError, UnauthorizedError } from '@/lib/errors';
import { getSession } from './session';
import { hasPermission, type Permission, type Role } from './rbac';

export async function requireAuth() {
  const session = await getSession();
  if (!session) throw new UnauthorizedError();
  return session;
}

export async function requirePermission(role: Role, permission: Permission) {
  if (!hasPermission(role, permission)) {
    throw new ForbiddenError(`Missing required permission: ${permission}`);
  }
}
