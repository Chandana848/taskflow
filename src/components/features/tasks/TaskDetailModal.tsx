'use client';

import React, { useEffect, useState } from 'react';

interface TaskDetailModalProps {
  taskId: string | null;
  onClose: () => void;
}

export function TaskDetailModal({ taskId, onClose }: TaskDetailModalProps) {
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!taskId) return;
    setLoading(true);
    fetch(`/api/tasks/${taskId}`)
      .then((res) => res.json())
      .then((data) => setTask(data.task))
      .finally(() => setLoading(false));
  }, [taskId]);

  if (!taskId) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="w-full max-w-xl bg-card border-l h-full shadow-2xl p-6 overflow-y-auto space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <span className="text-xs font-mono bg-muted px-2 py-1 rounded">TASK-{taskId.slice(0, 4)}</span>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">✕</button>
        </div>

        {loading || !task ? (
          <div>Loading details...</div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{task.title}</h2>
            <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-md">
              {task.description || 'No description provided.'}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t">
              <div>
                <span className="text-muted-foreground">Priority:</span>{' '}
                <span className="font-semibold">{task.priority}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>{' '}
                <span className="font-semibold">{task.column?.name || 'In Progress'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
