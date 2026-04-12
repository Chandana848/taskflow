import { activityRepository } from '@/server/repositories/activity.repository';

export class ActivityService {
  async getWorkspaceActivity(workspaceId: string, limit?: number) {
    return activityRepository.listByWorkspace(workspaceId, limit);
  }

  async getTaskActivity(taskId: string) {
    return activityRepository.listByTask(taskId);
  }
}

export const activityService = new ActivityService();
