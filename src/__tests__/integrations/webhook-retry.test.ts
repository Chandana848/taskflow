import { calculateBackoffDelay, shouldRetryWebhook } from '@/lib/integrations/webhook-retry';

describe('Webhook Retry Policy', () => {
  it('computes exponential backoff delays', () => {
    expect(calculateBackoffDelay(1, 5)).toBe(10);
    expect(calculateBackoffDelay(2, 5)).toBe(20);
  });

  it('retries server errors and rate limits only', () => {
    expect(shouldRetryWebhook(500, 1)).toBe(true);
    expect(shouldRetryWebhook(429, 1)).toBe(true);
    expect(shouldRetryWebhook(404, 1)).toBe(false);
  });
});
