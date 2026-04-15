import { prisma } from '@/lib/prisma';
import type { Prisma, Task } from '@prisma/client';

export interface TaskFilters {
  projectId?: string;
  columnId?: string;
  assigneeId?: string;
  priority?: Prisma.EnumPriorityFilter | string;
  search?: string;
}

export class TaskRepository {
  async findById(id: string): Promise<Task | null> {
    return prisma.task.findUnique({
      where: { id },
      include: {
        assignee: true,
        creator: true,
        column: true,
        labels: { include: { label: true } },
        subtasks: { orderBy: { position: 'asc' } },
        checklists: { include: { items: { orderBy: { position: 'asc' } } } },
        comments: { include: { author: true }, orderBy: { createdAt: 'desc' } },
        attachments: true,
      },
    });
  }

  async findMany(filters: TaskFilters): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        ...(filters.projectId && { projectId: filters.projectId }),
        ...(filters.columnId && { columnId: filters.columnId }),
        ...(filters.assigneeId && { assigneeId: filters.assigneeId }),
        ...(filters.priority && { priority: filters.priority as any }),
        ...(filters.search && {
          OR: [
            { title: { contains: filters.search } },
            { description: { contains: filters.search } },
          ],
        }),
        isArchived: false,
      },
      orderBy: { position: 'asc' },
      include: {
        assignee: true,
        labels: { include: { label: true } },
      },
    });
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return prisma.task.create({ data });
  }

  async update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    return prisma.task.update({ where: { id }, data });
  }

  async move(taskId: string, targetColumnId: string, newPosition: number): Promise<Task> {
    return prisma.task.update({
      where: { id: taskId },
      data: {
        columnId: targetColumnId,
        position: newPosition,
      },
    });
  }

  async delete(id: string): Promise<Task> {
    return prisma.task.delete({ where: { id } });
  }
}

export const taskRepository = new TaskRepository();
