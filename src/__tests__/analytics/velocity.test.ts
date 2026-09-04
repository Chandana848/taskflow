import { calculateAverageVelocity, calculateCompletionRate } from '@/lib/analytics/velocity';

describe('Velocity Analytics', () => {
  it('calculates average velocity across sprints', () => {
    const sprints = [
      { sprintId: '1', sprintName: 'S1', committedPoints: 20, completedPoints: 18 },
      { sprintId: '2', sprintName: 'S2', committedPoints: 25, completedPoints: 22 }
    ];
    expect(calculateAverageVelocity(sprints)).toBe(20);
  });

  it('calculates sprint completion rate percentage', () => {
    const sprint = { sprintId: '1', sprintName: 'S1', committedPoints: 20, completedPoints: 15 };
    expect(calculateCompletionRate(sprint)).toBe(75);
  });
});
