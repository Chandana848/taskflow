import { prisma } from '@/lib/prisma';
import type { Column, Prisma } from '@prisma/client';

export class ColumnRepository {
  async findById(id: string): Promise<Column | null> {
    return prisma.column.findUnique({ where: { id } });
  }

  async create(data: Prisma.ColumnCreateInput): Promise<Column> {
    return prisma.column.create({ data });
  }

  async update(id: string, data: Prisma.ColumnUpdateInput): Promise<Column> {
    return prisma.column.update({ where: { id }, data });
  }

  async reorder(columnId: string, newPosition: number): Promise<Column> {
    return prisma.column.update({
      where: { id: columnId },
      data: { position: newPosition },
    });
  }

  async delete(id: string): Promise<Column> {
    return prisma.column.delete({ where: { id } });
  }
}

export const columnRepository = new ColumnRepository();
