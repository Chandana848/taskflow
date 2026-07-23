import crypto from 'crypto';
import { timingSafeEqual } from './timing-safe';

export const CSRF_COOKIE_NAME = 'taskflow_csrf';
export const CSRF_HEADER_NAME = 'x-csrf-token';

export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function verifyCsrfToken(cookieToken?: string, headerToken?: string): boolean {
  if (!cookieToken || !headerToken) return false;
  return timingSafeEqual(cookieToken, headerToken);
}
