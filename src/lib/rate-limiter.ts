interface RateLimitRecord {
  timestamps: number[];
}

export class SlidingWindowRateLimiter {
  private records = new Map<string, RateLimitRecord>();
  private windowMs: number;
  private maxRequests: number;

  constructor(options: { windowMs?: number; maxRequests?: number } = {}) {
    this.windowMs = options.windowMs ?? 60 * 1000; // default 1 minute
    this.maxRequests = options.maxRequests ?? 100; // default 100 requests per min
  }

  check(key: string): { success: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    let record = this.records.get(key);
    if (!record) {
      record = { timestamps: [] };
      this.records.set(key, record);
    }

    // Filter out timestamps outside the sliding window
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    if (record.timestamps.length >= this.maxRequests) {
      const oldest = record.timestamps[0];
      return {
        success: false,
        remaining: 0,
        resetAt: oldest + this.windowMs,
      };
    }

    record.timestamps.push(now);
    return {
      success: true,
      remaining: this.maxRequests - record.timestamps.length,
      resetAt: now + this.windowMs,
    };
  }

  reset(key: string): void {
    this.records.delete(key);
  }
}

export const authRateLimiter = new SlidingWindowRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 10,           // 10 attempts
});

export const apiRateLimiter = new SlidingWindowRateLimiter({
  windowMs: 60 * 1000,       // 1 minute
  maxRequests: 120,          // 120 requests/min
});
