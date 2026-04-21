import { NextResponse } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { setSessionCookie } from '@/lib/auth/session';
import { loginSchema } from '@/lib/validations/auth.schema';
import { authRateLimiter } from '@/lib/rate-limiter';
import { AppError } from '@/lib/errors';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = authRateLimiter.check(ip);
    if (!rateCheck.success) {
      return NextResponse.json(
        { success: false, message: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = loginSchema.parse(body);
    const user = await authService.login(validated);

    await setSessionCookie({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    if (error instanceof AppError) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
