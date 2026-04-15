import { projectRepository } from '@/server/repositories/project.repository';
import { NotFoundError } from '@/lib/errors';
import type { CreateProjectInput } from '@/lib/validations/project.schema';

export class ProjectService {
  async getProject(id: string) {
    const project = await projectRepository.findById(id);
    if (!project) throw new NotFoundError('Project', id);
    return project;
  }

  async listWorkspaceProjects(workspaceId: string, includeArchived = false) {
    return projectRepository.listByWorkspace(workspaceId, includeArchived);
  }

  async createProject(workspaceId: string, data: CreateProjectInput) {
    return projectRepository.create({
      ...data,
      workspace: { connect: { id: workspaceId } },
      boards: {
        create: {
          name: 'Main Board',
          isDefault: true,
          columns: {
            create: [
              { name: 'Backlog', position: 0, color: '#94a3b8' },
              { name: 'To Do', position: 1, color: '#3b82f6' },
              { name: 'In Progress', position: 2, color: '#f59e0b' },
              { name: 'In Review', position: 3, color: '#8b5cf6' },
              { name: 'Done', position: 4, color: '#10b981' },
            ],
          },
        },
      },
    });
  }

  async archiveProject(id: string) {
    await this.getProject(id);
    return projectRepository.update(id, { isArchived: true });
  }

  async restoreProject(id: string) {
    await this.getProject(id);
    return projectRepository.update(id, { isArchived: false });
  }
}

export const projectService = new ProjectService();
