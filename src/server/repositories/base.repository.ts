import { prisma } from '@/lib/prisma';

export abstract class BaseRepository<T, CreateInput, UpdateInput> {
  protected prisma = prisma;

  abstract findById(id: string): Promise<T | null>;
  abstract create(data: CreateInput): Promise<T>;
  abstract update(id: string, data: UpdateInput): Promise<T>;
  abstract delete(id: string): Promise<T>;
}
