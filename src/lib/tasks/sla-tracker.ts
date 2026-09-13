export type SlaStatus = 'SAFE' | 'WARNING' | 'BREACHED' | 'NOT_APPLICABLE';

export function evaluateSlaStatus(dueDate: Date | string | null | undefined, warningThresholdHours = 24): SlaStatus {
  if (!dueDate) return 'NOT_APPLICABLE';
  const due = typeof dueDate === 'string' ? new Date(dueDate).getTime() : dueDate.getTime();
  const now = Date.now();
  const diffHours = (due - now) / (1000 * 60 * 60);

  if (diffHours < 0) return 'BREACHED';
  if (diffHours <= warningThresholdHours) return 'WARNING';
  return 'SAFE';
}
