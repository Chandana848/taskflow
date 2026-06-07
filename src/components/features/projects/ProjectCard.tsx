'use client';

import React from 'react';
import Link from 'next/link';

export interface ProjectCardProps {
  id: string;
  name: string;
  key: string;
  description?: string | null;
  color: string;
  taskCount?: number;
}

export function ProjectCard({ id, name, key, description, color, taskCount = 0 }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${id}`}
      className="block p-5 bg-card border rounded-xl shadow-sm hover:shadow-md transition-all border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-foreground truncate">{name}</h3>
        <span className="px-2 py-0.5 text-xs font-mono font-semibold bg-muted text-muted-foreground rounded">
          {key}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mt-2 line-clamp-2 min-h-[40px]">
        {description || 'No description provided.'}
      </p>
      <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs text-muted-foreground">
        <span>{taskCount} {taskCount === 1 ? 'task' : 'tasks'}</span>
        <span className="text-primary font-medium">Open Board →</span>
      </div>
    </Link>
  );
}
