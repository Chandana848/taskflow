import { NextResponse } from 'next/server';
import { generateCsrfToken, CSRF_COOKIE_NAME } from '@/lib/security/csrf';

export async function GET() {
  const token = generateCsrfToken();
  const res = NextResponse.json({ success: true, csrfToken: token });

  res.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: false, // Accessible to JS so client can send in x-csrf-token header
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return res;
}
