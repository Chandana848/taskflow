'use client';

import React from 'react';

export interface TaskItem {
  id: string;
  title: string;
  priority: string;
  dueDate?: string | null;
  assignee?: { name?: string | null; email: string; avatarUrl?: string | null } | null;
}

export function TaskCard({ task, onClick }: { task: TaskItem; onClick?: () => void }) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      className="p-3 bg-card border rounded-lg shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all space-y-2"
    >
      <div className="flex justify-between items-start gap-2">
        <span className="text-sm font-medium leading-snug line-clamp-2">{task.title}</span>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-muted">
          {task.priority}
        </span>
        {task.assignee && (
          <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px]">
            {task.assignee.name?.charAt(0) || task.assignee.email.charAt(0)}
          </span>
        )}
      </div>
    </div>
  );
}
