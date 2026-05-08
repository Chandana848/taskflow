import { hasPermission } from '@/lib/auth/rbac';

describe('RBAC Permissions', () => {
  it('should grant OWNER all critical permissions', () => {
    expect(hasPermission('OWNER', 'workspace:delete')).toBe(true);
    expect(hasPermission('OWNER', 'workspace:members:manage')).toBe(true);
    expect(hasPermission('OWNER', 'task:create')).toBe(true);
  });

  it('should restrict VIEWER from destructive actions', () => {
    expect(hasPermission('VIEWER', 'workspace:delete')).toBe(false);
    expect(hasPermission('VIEWER', 'task:create')).toBe(false);
  });

  it('should allow MEMBER to create tasks but not manage members', () => {
    expect(hasPermission('MEMBER', 'task:create')).toBe(true);
    expect(hasPermission('MEMBER', 'workspace:members:manage')).toBe(false);
  });
});
