import { generateCsrfToken, verifyCsrfToken } from '@/lib/security/csrf';

describe('CSRF Security', () => {
  it('generates high-entropy random tokens', () => {
    const t1 = generateCsrfToken();
    const t2 = generateCsrfToken();
    expect(t1).not.toBe(t2);
    expect(t1.length).toBe(64);
  });

  it('verifies double submit tokens matching', () => {
    const token = generateCsrfToken();
    expect(verifyCsrfToken(token, token)).toBe(true);
    expect(verifyCsrfToken(token, 'tampered')).toBe(false);
  });
});
