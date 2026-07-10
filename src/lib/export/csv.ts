export function exportTasksToCsv(tasks: any[]): string {
  const headers = ['ID', 'Title', 'Priority', 'Status', 'Assignee', 'DueDate'];
  const rows = tasks.map((t) => [
    t.id,
    `"${(t.title || '').replace(/"/g, '""')}"`,
    t.priority,
    t.column?.name || '',
    t.assignee?.email || '',
    t.dueDate ? new Date(t.dueDate).toISOString() : '',
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
