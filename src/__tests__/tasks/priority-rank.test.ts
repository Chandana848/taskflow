import { compareTaskPriority } from '@/lib/tasks/priority-rank';

describe('Priority Rank Comparator', () => {
  it('correctly ranks higher priority first', () => {
    expect(compareTaskPriority('URGENT', 'LOW')).toBeLessThan(0);
    expect(compareTaskPriority('LOW', 'HIGH')).toBeGreaterThan(0);
    expect(compareTaskPriority('MEDIUM', 'MEDIUM')).toBe(0);
  });
});
