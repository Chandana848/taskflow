import { NextResponse } from 'next/server';
import { userRepository } from '@/server/repositories/user.repository';
import { setSessionCookie } from '@/lib/auth/session';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=OAuthFailed', request.url));
  }

  // Mock OAuth user profile for local dev and testing
  const mockEmail = 'github_user@taskflow.dev';
  let user = await userRepository.findByEmail(mockEmail);

  if (!user) {
    user = await userRepository.create({
      email: mockEmail,
      name: 'GitHub Developer',
      role: 'MEMBER',
      avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
      emailVerified: new Date(),
    });
  }

  await setSessionCookie({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return NextResponse.redirect(new URL('/', request.url));
}
