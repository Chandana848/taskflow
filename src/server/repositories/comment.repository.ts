import { prisma } from '@/lib/prisma';
import type { Comment, Prisma } from '@prisma/client';

export class CommentRepository {
  async listByTask(taskId: string): Promise<Comment[]> {
    return prisma.comment.findMany({
      where: { taskId },
      include: { author: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(data: Prisma.CommentCreateInput): Promise<Comment> {
    return prisma.comment.create({
      data,
      include: { author: true },
    });
  }

  async update(id: string, content: string): Promise<Comment> {
    return prisma.comment.update({
      where: { id },
      data: { content, isEdited: true },
    });
  }

  async delete(id: string): Promise<Comment> {
    return prisma.comment.delete({ where: { id } });
  }
}

export const commentRepository = new CommentRepository();
