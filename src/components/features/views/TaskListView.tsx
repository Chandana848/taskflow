'use client';

import { useState } from 'react';

export interface ListViewTask {
  id: string;
  title: string;
  priority: string;
  columnName: string;
  assigneeName?: string | null;
  dueDate?: string | null;
}

export function TaskListView({ tasks, onTaskClick }: { tasks: ListViewTask[]; onTaskClick?: (id: string) => void }) {
  const [sortField, setSortField] = useState<'title' | 'priority' | 'status'>('title');

  const sorted = [...tasks].sort((a, b) => {
    if (sortField === 'title') return a.title.localeCompare(b.title);
    if (sortField === 'priority') return a.priority.localeCompare(b.priority);
    return a.columnName.localeCompare(b.columnName);
  });

  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted text-muted-foreground border-b text-xs uppercase font-semibold">
          <tr>
            <th className="px-4 py-3 cursor-pointer" onClick={() => setSortField('title')}>
              Task Title
            </th>
            <th className="px-4 py-3 cursor-pointer" onClick={() => setSortField('priority')}>
              Priority
            </th>
            <th className="px-4 py-3 cursor-pointer" onClick={() => setSortField('status')}>
              Status
            </th>
            <th className="px-4 py-3">Assignee</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {sorted.map((t) => (
            <tr
              key={t.id}
              onClick={() => onTaskClick?.(t.id)}
              className="hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <td className="px-4 py-3 font-medium">{t.title}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded text-xs font-bold uppercase bg-muted">
                  {t.priority}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{t.columnName}</td>
              <td className="px-4 py-3 text-muted-foreground">{t.assigneeName || 'Unassigned'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
