# Security & Defense-in-Depth

Security layers implemented in TaskFlow:
- Double-Submit CSRF cookie & header validation
- Strict Content Security Policy (CSP) headers
- Multi-layer HTML sanitization preventing XSS
- Timing-safe cryptographic comparison
- Sliding-window in-memory rate limiting
- Sensitive field masking in audit logs
