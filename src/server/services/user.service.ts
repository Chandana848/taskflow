import { userRepository } from '@/server/repositories/user.repository';
import { NotFoundError, ConflictError } from '@/lib/errors';
import type { CreateUserInput, UpdateUserInput } from '@/lib/validations/user.schema';

export class UserService {
  async getUser(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError('User', id);
    return user;
  }

  async getUserByEmail(email: string) {
    return userRepository.findByEmail(email);
  }

  async createUser(data: CreateUserInput & { passwordHash: string }) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw new ConflictError('A user with this email already exists');
    return userRepository.create(data);
  }

  async updateUser(id: string, data: UpdateUserInput) {
    await this.getUser(id);
    return userRepository.update(id, data);
  }
}

export const userService = new UserService();
