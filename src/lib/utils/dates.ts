export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffSec < 60) return 'just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function isOverdue(dueDate?: Date | string | null): boolean {
  if (!dueDate) return false;
  const d = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  return d.getTime() < Date.now();
}
