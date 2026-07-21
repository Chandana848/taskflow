import { SlidingWindowRateLimiter } from '@/lib/rate-limiter';

describe('SlidingWindowRateLimiter', () => {
  it('permits requests within quota and restricts when exceeded', () => {
    const limiter = new SlidingWindowRateLimiter({ windowMs: 1000, maxRequests: 2 });
    expect(limiter.check('ip-1').success).toBe(true);
    expect(limiter.check('ip-1').success).toBe(true);
    expect(limiter.check('ip-1').success).toBe(false);
  });

  it('resets key properly', () => {
    const limiter = new SlidingWindowRateLimiter({ windowMs: 1000, maxRequests: 1 });
    limiter.check('ip-2');
    limiter.reset('ip-2');
    expect(limiter.check('ip-2').success).toBe(true);
  });
});
