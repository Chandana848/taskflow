import { loginSchema, registerSchema } from '@/lib/validations/auth.schema';

describe('Auth Validation Schemas', () => {
  it('validates correct login credentials', () => {
    const result = loginSchema.safeParse({ email: 'test@example.com', password: 'password123' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email in login', () => {
    const result = loginSchema.safeParse({ email: 'not-an-email', password: 'password123' });
    expect(result.success).toBe(false);
  });

  it('enforces strong password in registration', () => {
    const weak = registerSchema.safeParse({
      name: 'User',
      email: 'test@example.com',
      password: 'weak',
    });
    expect(weak.success).toBe(false);

    const strong = registerSchema.safeParse({
      name: 'User',
      email: 'test@example.com',
      password: 'StrongPassword123',
    });
    expect(strong.success).toBe(true);
  });
});
