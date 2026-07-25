import { buildContentSecurityPolicy } from './csp';

export function getSecurityHeaders(): Record<string, string> {
  return {
    'Content-Security-Policy': buildContentSecurityPolicy(),
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  };
}
