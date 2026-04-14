import { taskRepository, type TaskFilters } from '@/server/repositories/task.repository';
import { activityRepository } from '@/server/repositories/activity.repository';
import { NotFoundError } from '@/lib/errors';
import type { CreateTaskInput, UpdateTaskInput, MoveTaskInput } from '@/lib/validations/task.schema';

export class TaskService {
  async getTask(id: string) {
    const task = await taskRepository.findById(id);
    if (!task) throw new NotFoundError('Task', id);
    return task;
  }

  async listTasks(filters: TaskFilters) {
    return taskRepository.findMany(filters);
  }

  async createTask(userId: string, workspaceId: string, data: CreateTaskInput) {
    const task = await taskRepository.create({
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      estimate: data.estimate,
      project: { connect: { id: data.projectId } },
      column: { connect: { id: data.columnId } },
      creator: { connect: { id: userId } },
      ...(data.assigneeId && { assignee: { connect: { id: data.assigneeId } } }),
    });

    await activityRepository.log({
      workspace: { connect: { id: workspaceId } },
      project: { connect: { id: data.projectId } },
      task: { connect: { id: task.id } },
      user: { connect: { id: userId } },
      action: 'TASK_CREATED',
      entityType: 'TASK',
      entityId: task.id,
      details: JSON.stringify({ title: task.title }),
    });

    return task;
  }

  async moveTask(userId: string, workspaceId: string, data: MoveTaskInput) {
    const moved = await taskRepository.move(data.taskId, data.targetColumnId, data.newPosition);
    await activityRepository.log({
      workspace: { connect: { id: workspaceId } },
      task: { connect: { id: data.taskId } },
      user: { connect: { id: userId } },
      action: 'TASK_MOVED',
      entityType: 'TASK',
      entityId: data.taskId,
      details: JSON.stringify({ columnId: data.targetColumnId, position: data.newPosition }),
    });
    return moved;
  }

  async updateTask(id: string, data: UpdateTaskInput) {
    await this.getTask(id);
    return taskRepository.update(id, {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    });
  }
}

export const taskService = new TaskService();
