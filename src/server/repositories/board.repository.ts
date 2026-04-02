import { prisma } from '@/lib/prisma';
import type { Board, Prisma } from '@prisma/client';

export class BoardRepository {
  async findById(id: string): Promise<Board | null> {
    return prisma.board.findUnique({
      where: { id },
      include: {
        columns: {
          orderBy: { position: 'asc' },
          include: {
            tasks: {
              where: { isArchived: false },
              orderBy: { position: 'asc' },
              include: {
                assignee: true,
                labels: { include: { label: true } },
                _count: { select: { comments: true, subtasks: true } },
              },
            },
          },
        },
      },
    });
  }

  async create(data: Prisma.BoardCreateInput): Promise<Board> {
    return prisma.board.create({ data });
  }

  async update(id: string, data: Prisma.BoardUpdateInput): Promise<Board> {
    return prisma.board.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Board> {
    return prisma.board.delete({ where: { id } });
  }
}

export const boardRepository = new BoardRepository();
