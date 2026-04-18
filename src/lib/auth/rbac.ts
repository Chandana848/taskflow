export type Role = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';

export type Permission =
  | 'workspace:delete'
  | 'workspace:update'
  | 'workspace:members:manage'
  | 'project:create'
  | 'project:delete'
  | 'project:update'
  | 'task:create'
  | 'task:update'
  | 'task:delete'
  | 'task:assign'
  | 'comment:create'
  | 'comment:delete_any';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  OWNER: [
    'workspace:delete',
    'workspace:update',
    'workspace:members:manage',
    'project:create',
    'project:delete',
    'project:update',
    'task:create',
    'task:update',
    'task:delete',
    'task:assign',
    'comment:create',
    'comment:delete_any',
  ],
  ADMIN: [
    'workspace:update',
    'workspace:members:manage',
    'project:create',
    'project:delete',
    'project:update',
    'task:create',
    'task:update',
    'task:delete',
    'task:assign',
    'comment:create',
    'comment:delete_any',
  ],
  MEMBER: [
    'project:create',
    'task:create',
    'task:update',
    'task:assign',
    'comment:create',
  ],
  VIEWER: [],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
