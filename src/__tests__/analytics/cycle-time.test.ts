import { calculateCycleTimeHours, calculateLeadTimeHours } from '@/lib/analytics/cycle-time';

describe('Cycle Time Analytics', () => {
  it('calculates cycle time in hours', () => {
    const timing = {
      taskId: 't-1',
      createdAt: '2026-01-01T00:00:00Z',
      startedAt: '2026-01-01T10:00:00Z',
      completedAt: '2026-01-01T15:00:00Z'
    };
    expect(calculateCycleTimeHours(timing)).toBe(5);
  });

  it('calculates lead time in hours', () => {
    const timing = {
      taskId: 't-1',
      createdAt: '2026-01-01T00:00:00Z',
      completedAt: '2026-01-01T24:00:00Z'
    };
    expect(calculateLeadTimeHours(timing)).toBe(24);
  });
});
