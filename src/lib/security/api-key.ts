import crypto from 'crypto';

export function generateApiKey(): { key: string; hash: string } {
  const raw = `tf_${crypto.randomBytes(24).toString('base64url')}`;
  const hash = hashApiKey(raw);
  return { key: raw, hash };
}

export function hashApiKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}
