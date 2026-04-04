import { prisma } from '@/lib/prisma';
import type { ActivityLog, Prisma } from '@prisma/client';

export class ActivityRepository {
  async log(data: Prisma.ActivityLogCreateInput): Promise<ActivityLog> {
    return prisma.activityLog.create({ data });
  }

  async listByWorkspace(workspaceId: string, limit = 50): Promise<ActivityLog[]> {
    return prisma.activityLog.findMany({
      where: { workspaceId },
      include: { user: true, project: true, task: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async listByTask(taskId: string): Promise<ActivityLog[]> {
    return prisma.activityLog.findMany({
      where: { taskId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const activityRepository = new ActivityRepository();
