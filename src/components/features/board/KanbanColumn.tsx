'use client';

import React from 'react';
import { TaskCard, type TaskItem } from './TaskCard';

export interface ColumnWithTasks {
  id: string;
  name: string;
  color: string;
  tasks: TaskItem[];
}

export function KanbanColumn({
  column,
  onTaskMove,
  onTaskClick,
}: {
  column: ColumnWithTasks;
  onTaskMove?: (taskId: string, targetColId: string) => void;
  onTaskClick?: (taskId: string) => void;
}) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId && onTaskMove) {
      onTaskMove(taskId, column.id);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-80 flex-shrink-0 bg-muted/40 border rounded-xl flex flex-col max-h-full"
    >
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: column.color }} />
          <h4 className="font-semibold text-sm">{column.name}</h4>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-muted font-bold text-muted-foreground">
          {column.tasks.length}
        </span>
      </div>

      <div className="p-2 space-y-2 overflow-y-auto flex-1">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick?.(task.id)} />
        ))}
      </div>
    </div>
  );
}
