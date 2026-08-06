import { generateSecureToken, generateNumericOtp } from '@/lib/security/tokens';

describe('Token Generation', () => {
  it('generates secure hex tokens and 6-digit numeric OTPs', () => {
    const hex = generateSecureToken(16);
    expect(hex.length).toBe(32);

    const otp = generateNumericOtp(6);
    expect(otp.length).toBe(6);
    expect(/^\d{6}$/.test(otp)).toBe(true);
  });
});
