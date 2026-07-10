import { signWebhookPayload } from '@/lib/webhooks/dispatcher';

describe('Webhook HMAC', () => {
  it('generates consistent sha256 signatures', () => {
    const payload = JSON.stringify({ test: true });
    const secret = 'super_secret';
    const sig1 = signWebhookPayload(payload, secret);
    const sig2 = signWebhookPayload(payload, secret);

    expect(sig1).toBe(sig2);
    expect(typeof sig1).toBe('string');
  });
});
