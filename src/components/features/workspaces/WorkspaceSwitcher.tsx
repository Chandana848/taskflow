'use client';

import { useState } from 'react';
import { useWorkspace } from '@/hooks/useWorkspace';

export function WorkspaceSwitcher({ onOpenCreate }: { onOpenCreate?: () => void }) {
  const { workspaces, activeWorkspace, setActiveWorkspace } = useWorkspace();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-card hover:bg-muted font-medium text-sm transition-colors"
      >
        <span className="w-5 h-5 rounded bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
          {activeWorkspace?.name.charAt(0) || 'W'}
        </span>
        <span className="truncate max-w-[140px]">{activeWorkspace?.name || 'Select Workspace'}</span>
        <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-popover border z-50 py-1">
          <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase">Workspaces</div>
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => {
                setActiveWorkspace(ws);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-muted flex items-center gap-2"
            >
              <span className="w-4 h-4 rounded bg-primary/20 text-primary text-xs flex items-center justify-center">
                {ws.name.charAt(0)}
              </span>
              <span className="truncate">{ws.name}</span>
            </button>
          ))}
          <div className="border-t my-1" />
          <button
            onClick={() => {
              setOpen(false);
              onOpenCreate?.();
            }}
            className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-muted flex items-center gap-2 font-medium"
          >
            + New Workspace
          </button>
        </div>
      )}
    </div>
  );
}
