export interface TaskTiming {
  taskId: string;
  createdAt: Date | string;
  startedAt?: Date | string | null;
  completedAt?: Date | string | null;
}

export function calculateCycleTimeHours(timing: TaskTiming): number | null {
  if (!timing.startedAt || !timing.completedAt) return null;
  const start = new Date(timing.startedAt).getTime();
  const end = new Date(timing.completedAt).getTime();
  if (end < start) return 0;
  return Math.round(((end - start) / (1000 * 60 * 60)) * 10) / 10;
}

export function calculateLeadTimeHours(timing: TaskTiming): number | null {
  if (!timing.completedAt) return null;
  const created = new Date(timing.createdAt).getTime();
  const completed = new Date(timing.completedAt).getTime();
  if (completed < created) return 0;
  return Math.round(((completed - created) / (1000 * 60 * 60)) * 10) / 10;
}
