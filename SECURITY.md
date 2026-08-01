# Security Policy

## Supported Versions
| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability
TaskFlow takes security seriously. If you discover a vulnerability:
1. **Do not disclose publicly.**
2. Email security findings to `security@taskflow.dev`.
3. Provide reproduction steps, potential impact, and suggested mitigations.
4. We aim to acknowledge reports within 24 hours and issue patches within 7 days.

## Security Practices
- **Strict Content Security Policy (CSP)** to neutralize Cross-Site Scripting (XSS).
- **Double-Submit Cookie CSRF protection** on all state-mutating HTTP requests.
- **Timing-safe comparison** on secret signatures and authentication tokens.
- **Tenant isolation assertions** preventing data leakage across workspaces.
- **Sliding-window rate limiting** protecting auth routes from brute-force attempts.
