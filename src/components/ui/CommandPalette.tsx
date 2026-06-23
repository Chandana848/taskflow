'use client';

import { useEffect, useState } from 'react';

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/50 p-4">
      <div className="w-full max-w-xl bg-card border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        <div className="p-4 border-b flex items-center gap-3">
          <span className="text-muted-foreground">🔍</span>
          <input
            autoFocus
            type="text"
            placeholder="Search tasks, projects, actions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground">ESC</kbd>
        </div>
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase">Navigation</div>
          <button onClick={onClose} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted">
            Go to Workspaces
          </button>
          <button onClick={onClose} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted">
            Go to Settings
          </button>
        </div>
      </div>
    </div>
  );
}
