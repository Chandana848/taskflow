import { prisma } from '@/lib/prisma';
import type { Prisma, Project } from '@prisma/client';

export class ProjectRepository {
  async findById(id: string): Promise<Project | null> {
    return prisma.project.findUnique({
      where: { id },
      include: { boards: true },
    });
  }

  async listByWorkspace(workspaceId: string, includeArchived = false): Promise<Project[]> {
    return prisma.project.findMany({
      where: {
        workspaceId,
        ...(includeArchived ? {} : { isArchived: false }),
      },
      include: {
        boards: true,
        _count: { select: { tasks: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return prisma.project.create({ data });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
    return prisma.project.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Project> {
    return prisma.project.delete({ where: { id } });
  }
}

export const projectRepository = new ProjectRepository();
