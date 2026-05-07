import { hashPassword, verifyPassword } from '@/lib/auth/password';

describe('Password Utilities', () => {
  it('should hash a password and correctly verify it', async () => {
    const raw = 'SecureSecretPass123!';
    const hash = await hashPassword(raw);

    expect(hash).not.toBe(raw);
    const valid = await verifyPassword(raw, hash);
    expect(valid).toBe(true);

    const invalid = await verifyPassword('WrongPassword', hash);
    expect(invalid).toBe(false);
  });
});
