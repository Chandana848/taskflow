import { NextResponse } from 'next/server';
import { getGitHubAuthUrl } from '@/lib/auth/oauth';

export async function GET() {
  const state = Math.random().toString(36).substring(7);
  const redirectUrl = getGitHubAuthUrl(state);
  return NextResponse.redirect(redirectUrl);
}
