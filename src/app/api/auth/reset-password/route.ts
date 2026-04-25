import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { hashPassword } from '@/lib/auth/password';
import { userRepository } from '@/server/repositories/user.repository';
import { resetPasswordSchema } from '@/lib/validations/auth.schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, password } = resetPasswordSchema.parse(body);

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid or expired reset token' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    await userRepository.update(payload.userId, { passwordHash });

    return NextResponse.json({ success: true, message: 'Password has been successfully reset' });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
