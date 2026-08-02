import { sanitizeHtml, sanitizeText } from '@/lib/security/sanitize';

describe('Sanitization Security', () => {
  it('escapes dangerous HTML script tags', () => {
    const attack = '<script>alert("XSS")</script>';
    const safe = sanitizeHtml(attack);
    expect(safe).not.toContain('<script>');
    expect(safe).toContain('&lt;script&gt;');
  });

  it('strips non-printable ASCII control characters from text', () => {
    const raw = 'Task\u0000Flow';
    expect(sanitizeText(raw)).toBe('TaskFlow');
  });
});
