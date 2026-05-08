import { signToken, verifyToken } from '@/lib/auth/jwt';

describe('JWT Utilities', () => {
  it('should sign a payload and verify token contents', () => {
    const payload = { userId: 'usr_123', email: 'user@taskflow.dev', role: 'MEMBER' };
    const token = signToken(payload);

    expect(typeof token).toBe('string');
    const decoded = verifyToken(token);
    expect(decoded?.userId).toBe(payload.userId);
    expect(decoded?.email).toBe(payload.email);
    expect(decoded?.role).toBe(payload.role);
  });

  it('should return null for malformed tokens', () => {
    expect(verifyToken('invalid.token.here')).toBeNull();
  });
});
