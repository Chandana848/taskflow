export interface SprintMetrics {
  sprintId: string;
  sprintName: string;
  committedPoints: number;
  completedPoints: number;
}

export function calculateAverageVelocity(sprints: SprintMetrics[]): number {
  if (!sprints.length) return 0;
  const total = sprints.reduce((acc, s) => acc + s.completedPoints, 0);
  return Math.round((total / sprints.length) * 10) / 10;
}

export function calculateCompletionRate(sprint: SprintMetrics): number {
  if (sprint.committedPoints === 0) return 0;
  return Math.min(100, Math.round((sprint.completedPoints / sprint.committedPoints) * 100));
}
