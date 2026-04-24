import { NextResponse } from 'next/server';
import { userRepository } from '@/server/repositories/user.repository';
import { signToken } from '@/lib/auth/jwt';
import { emailService } from '@/server/services/email.service';
import { forgotPasswordSchema } from '@/lib/validations/auth.schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    const user = await userRepository.findByEmail(email);
    if (user) {
      const resetToken = signToken({ userId: user.id, email: user.email, role: user.role }, '1h');
      await emailService.sendPasswordResetEmail(email, resetToken);
    }

    // Always return 200 to prevent user enumeration
    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, a reset link has been dispatched.',
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
