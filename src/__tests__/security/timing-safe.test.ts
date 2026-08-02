import { timingSafeEqual } from '@/lib/security/timing-safe';

describe('Timing Safe Comparison', () => {
  it('returns true for matching strings', () => {
    expect(timingSafeEqual('secure_token_123', 'secure_token_123')).toBe(true);
  });

  it('returns false for unequal strings or different lengths', () => {
    expect(timingSafeEqual('token_a', 'token_b')).toBe(false);
    expect(timingSafeEqual('short', 'longer_token')).toBe(false);
  });
});
