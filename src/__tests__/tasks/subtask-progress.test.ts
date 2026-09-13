import { calculateSubtaskProgress } from '@/lib/tasks/subtask-progress';

describe('Subtask Progress', () => {
  it('calculates completion metrics correctly', () => {
    const items = [
      { id: '1', completed: true },
      { id: '2', completed: false }
    ];
    const res = calculateSubtaskProgress(items);
    expect(res.total).toBe(2);
    expect(res.completed).toBe(1);
    expect(res.percentage).toBe(50);
  });
});
