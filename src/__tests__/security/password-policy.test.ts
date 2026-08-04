import { validatePasswordStrength } from '@/lib/security/password-policy';

describe('Password Policy', () => {
  it('rejects weak or dictionary passwords', () => {
    expect(validatePasswordStrength('password').valid).toBe(false);
    expect(validatePasswordStrength('12345').valid).toBe(false);
  });

  it('accepts strong complex passwords', () => {
    expect(validatePasswordStrength('ComplexPassw0rd!').valid).toBe(true);
  });
});
