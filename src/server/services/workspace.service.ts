import { workspaceRepository } from '@/server/repositories/workspace.repository';
import { NotFoundError, ConflictError } from '@/lib/errors';
import type { CreateWorkspaceInput, UpdateWorkspaceInput } from '@/lib/validations/workspace.schema';

export class WorkspaceService {
  async getWorkspace(id: string) {
    const ws = await workspaceRepository.findById(id);
    if (!ws) throw new NotFoundError('Workspace', id);
    return ws;
  }

  async listUserWorkspaces(userId: string) {
    return workspaceRepository.listForUser(userId);
  }

  async createWorkspace(userId: string, data: CreateWorkspaceInput) {
    const existing = await workspaceRepository.findBySlug(data.slug);
    if (existing) throw new ConflictError('Workspace slug already taken');

    return workspaceRepository.create({
      ...data,
      owner: { connect: { id: userId } },
      members: {
        create: {
          userId,
          role: 'OWNER',
        },
      },
    });
  }

  async updateWorkspace(id: string, data: UpdateWorkspaceInput) {
    await this.getWorkspace(id);
    return workspaceRepository.update(id, data);
  }

  async deleteWorkspace(id: string) {
    await this.getWorkspace(id);
    return workspaceRepository.delete(id);
  }
}

export const workspaceService = new WorkspaceService();
