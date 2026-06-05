import { TaskService } from '@/server/services/task.service';

describe('TaskService', () => {
  it('instantiates task service correctly', () => {
    const service = new TaskService();
    expect(service).toBeDefined();
    expect(typeof service.createTask).toBe('function');
    expect(typeof service.moveTask).toBe('function');
  });
});
