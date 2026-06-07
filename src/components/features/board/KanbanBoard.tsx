'use client';

import React from 'react';
import { KanbanColumn, type ColumnWithTasks } from './KanbanColumn';

interface KanbanBoardProps {
  columns: ColumnWithTasks[];
  onTaskMove?: (taskId: string, targetColId: string) => void;
  onTaskClick?: (taskId: string) => void;
}

export function KanbanBoard({ columns, onTaskMove, onTaskClick }: KanbanBoardProps) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-6 h-[calc(100vh-180px)] items-start">
      {columns.map((col) => (
        <KanbanColumn
          key={col.id}
          column={col}
          onTaskMove={onTaskMove}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  );
}
