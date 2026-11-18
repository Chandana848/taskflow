# Authentication & Session Management

TaskFlow supports dual authentication:
1. Standard email and salted bcrypt password hashing (12 rounds).
2. GitHub OAuth provider flow.

Sessions are maintained using cryptographic JSON Web Tokens (HS256) stored in HttpOnly, SameSite=Lax, Secure cookies.
