import { generateProjectJson } from '@/lib/export/json';

describe('JSON Export', () => {
  it('generates valid JSON export structure', () => {
    const data = {
      id: 'p-1',
      name: 'Alpha',
      key: 'ALPH',
      tasks: [{ id: 't-1', title: 'Task 1' }]
    };
    const jsonStr = generateProjectJson(data);
    const parsed = JSON.parse(jsonStr);
    expect(parsed.version).toBe('1.0.0');
    expect(parsed.project.name).toBe('Alpha');
    expect(parsed.project.taskCount).toBe(1);
  });
});
