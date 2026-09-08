import { hasCircularDependency } from '@/lib/tasks/dependencies';

describe('Task Dependencies Circularity', () => {
  it('detects direct circular dependency', () => {
    expect(hasCircularDependency([], 'A', 'A')).toBe(true);
  });

  it('detects indirect loop A -> B -> A', () => {
    const edges = [{ taskId: 'A', dependsOnId: 'B' }];
    expect(hasCircularDependency(edges, 'B', 'A')).toBe(true);
  });

  it('allows valid acyclic graph', () => {
    const edges = [{ taskId: 'A', dependsOnId: 'B' }];
    expect(hasCircularDependency(edges, 'B', 'C')).toBe(false);
  });
});
