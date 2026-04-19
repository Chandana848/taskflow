import { userRepository } from '@/server/repositories/user.repository';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { UnauthorizedError, ConflictError } from '@/lib/errors';
import type { LoginInput, RegisterInput } from '@/lib/validations/auth.schema';

export class AuthService {
  async register(input: RegisterInput) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) throw new ConflictError('A user with this email already exists');

    const passwordHash = await hashPassword(input.password);
    const user = await userRepository.create({
      email: input.email,
      name: input.name,
      passwordHash,
      role: 'MEMBER',
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isValid = await verifyPassword(input.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}

export const authService = new AuthService();
