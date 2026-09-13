export interface DistributedTask {
  id: string;
  priority: string;
  assigneeId?: string | null;
  status: string;
}

export function groupTasksByPriority(tasks: DistributedTask[]): Record<string, number> {
  const result: Record<string, number> = { URGENT: 0, HIGH: 0, MEDIUM: 0, LOW: 0, NONE: 0 };
  for (const t of tasks) {
    const key = t.priority || 'NONE';
    result[key] = (result[key] || 0) + 1;
  }
  return result;
}

export function groupTasksByAssignee(tasks: DistributedTask[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const t of tasks) {
    const key = t.assigneeId || 'UNASSIGNED';
    result[key] = (result[key] || 0) + 1;
  }
  return result;
}
