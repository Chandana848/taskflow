import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { userRepository } from '@/server/repositories/user.repository';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ success: false, message: 'Verification token required' }, { status: 400 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 400 });
    }

    await userRepository.update(payload.userId, { emailVerified: new Date() });
    return NextResponse.json({ success: true, message: 'Email verified successfully' });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to verify email' }, { status: 500 });
  }
}
