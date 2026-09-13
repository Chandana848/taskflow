import { canManageRole, isRoleAtLeast } from '@/lib/workspace/role-hierarchy';

describe('Role Hierarchy Rules', () => {
  it('allows owner to manage admin and member', () => {
    expect(canManageRole('OWNER', 'ADMIN')).toBe(true);
    expect(canManageRole('OWNER', 'MEMBER')).toBe(true);
  });

  it('disallows admin from managing owner or admin', () => {
    expect(canManageRole('ADMIN', 'OWNER')).toBe(false);
    expect(canManageRole('ADMIN', 'ADMIN')).toBe(false);
  });

  it('checks role minimum threshold', () => {
    expect(isRoleAtLeast('ADMIN', 'MEMBER')).toBe(true);
    expect(isRoleAtLeast('VIEWER', 'MEMBER')).toBe(false);
  });
});
