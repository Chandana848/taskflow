import { ProjectService } from '@/server/services/project.service';

describe('ProjectService', () => {
  it('instantiates project service correctly', () => {
    const service = new ProjectService();
    expect(service).toBeDefined();
    expect(typeof service.createProject).toBe('function');
    expect(typeof service.archiveProject).toBe('function');
  });
});
