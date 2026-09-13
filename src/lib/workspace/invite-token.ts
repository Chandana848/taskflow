import crypto from 'crypto';

export interface InvitePayload {
  workspaceId: string;
  email: string;
  expiresAt: number;
}

export function generateInviteToken(payload: InvitePayload, secret = 'invite-secret-key'): string {
  const data = JSON.stringify(payload);
  const signature = crypto.createHmac('sha256', secret).update(data).digest('hex');
  return Buffer.from(JSON.stringify({ data, sig: signature })).toString('base64url');
}

export function verifyInviteToken(token: string, secret = 'invite-secret-key'): InvitePayload | null {
  try {
    const raw = Buffer.from(token, 'base64url').toString('utf-8');
    const { data, sig } = JSON.parse(raw);
    const expectedSig = crypto.createHmac('sha256', secret).update(data).digest('hex');
    if (expectedSig !== sig) return null;

    const payload: InvitePayload = JSON.parse(data);
    if (Date.now() > payload.expiresAt) return null;
    return payload;
  } catch {
    return null;
  }
}
