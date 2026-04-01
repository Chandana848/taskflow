import { prisma } from '@/lib/prisma';
import type { Prisma, Workspace } from '@prisma/client';

export class WorkspaceRepository {
  async findById(id: string): Promise<Workspace | null> {
    return prisma.workspace.findUnique({
      where: { id },
      include: {
        members: { include: { user: true } },
        projects: true,
      },
    });
  }

  async findBySlug(slug: string): Promise<Workspace | null> {
    return prisma.workspace.findUnique({ where: { slug } });
  }

  async listForUser(userId: string): Promise<Workspace[]> {
    return prisma.workspace.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { userId } } },
        ],
      },
      include: { members: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async create(data: Prisma.WorkspaceCreateInput): Promise<Workspace> {
    return prisma.workspace.create({ data });
  }

  async update(id: string, data: Prisma.WorkspaceUpdateInput): Promise<Workspace> {
    return prisma.workspace.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Workspace> {
    return prisma.workspace.delete({ where: { id } });
  }
}

export const workspaceRepository = new WorkspaceRepository();
