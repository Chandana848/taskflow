export interface SubtaskItem {
  id: string;
  completed: boolean;
}

export function calculateSubtaskProgress(subtasks: SubtaskItem[]): { total: number; completed: number; percentage: number } {
  const total = subtasks.length;
  if (total === 0) return { total: 0, completed: 0, percentage: 0 };
  const completed = subtasks.filter(s => s.completed).length;
  const percentage = Math.round((completed / total) * 100);
  return { total, completed, percentage };
}
