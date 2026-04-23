import { NextResponse } from 'next/server';
import { getSession, setSessionCookie } from '@/lib/auth/session';

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Session expired' }, { status: 401 });
  }

  const token = await setSessionCookie(session);
  return NextResponse.json({ success: true, token });
}
