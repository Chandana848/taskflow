import { WorkspaceRepository } from '@/server/repositories/workspace.repository';

describe('WorkspaceRepository', () => {
  it('exposes workspace query methods', () => {
    const repo = new WorkspaceRepository();
    expect(typeof repo.findBySlug).toBe('function');
    expect(typeof repo.listForUser).toBe('function');
  });
});
