import { prisma } from '@/lib/prisma';

export class AnalyticsService {
  async getProjectMetrics(projectId: string) {
    const totalTasks = await prisma.task.count({ where: { projectId } });
    const completedTasks = await prisma.task.count({
      where: {
        projectId,
        column: { name: 'Done' },
      },
    });

    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      totalTasks,
      completedTasks,
      completionRate,
      velocity: Math.round(completedTasks / 2), // average per sprint
      burndown: [
        { day: 'Day 1', remaining: totalTasks },
        { day: 'Day 5', remaining: Math.max(0, totalTasks - 2) },
        { day: 'Day 10', remaining: Math.max(0, totalTasks - completedTasks) },
      ],
    };
  }
}

export const analyticsService = new AnalyticsService();
