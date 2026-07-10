import crypto from 'crypto';

export function signWebhookPayload(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

export async function dispatchWebhook(url: string, secret: string, event: string, data: any): Promise<boolean> {
  const body = JSON.stringify({ event, data, timestamp: new Date().toISOString() });
  const signature = signWebhookPayload(body, secret);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-TaskFlow-Signature': signature,
      },
      body,
    });
    return res.ok;
  } catch {
    return false;
  }
}
