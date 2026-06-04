import { WorkspaceService } from '@/server/services/workspace.service';

describe('WorkspaceService', () => {
  it('instantiates workspace service correctly', () => {
    const service = new WorkspaceService();
    expect(service).toBeDefined();
    expect(typeof service.createWorkspace).toBe('function');
    expect(typeof service.getWorkspace).toBe('function');
  });
});
