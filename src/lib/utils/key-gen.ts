export function generateProjectKey(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return cleaned.substring(0, 4) || 'TASK';
}

export function formatTaskIdentifier(projectKey: string, taskNumber: number): string {
  return `${projectKey}-${taskNumber}`;
}
