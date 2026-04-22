import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { userRepository } from '@/server/repositories/user.repository';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  const user = await userRepository.findById(session.userId);
  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatarUrl: user.avatarUrl,
    },
  });
}
