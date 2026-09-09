import { generateInviteToken, verifyInviteToken } from '@/lib/workspace/invite-token';

describe('Invite Token Verification', () => {
  it('signs and verifies a valid invite token', () => {
    const payload = {
      workspaceId: 'w-1',
      email: 'user@example.com',
      expiresAt: Date.now() + 60000
    };
    const token = generateInviteToken(payload);
    const verified = verifyInviteToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.email).toBe('user@example.com');
  });

  it('rejects expired token', () => {
    const payload = {
      workspaceId: 'w-1',
      email: 'user@example.com',
      expiresAt: Date.now() - 1000
    };
    const token = generateInviteToken(payload);
    expect(verifyInviteToken(token)).toBeNull();
  });
});
