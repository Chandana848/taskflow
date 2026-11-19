'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { KanbanBoard } from '@/components/features/board/KanbanBoard';
import { TaskDetailModal } from '@/components/features/tasks/TaskDetailModal';

function BoardContent() {
  const params = useParams();
  const boardId = params.id as string;
  const [board, setBoard] = useState<any>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const fetchBoard = async () => {
    const res = await fetch(`/api/boards/${boardId}`);
    if (res.ok) {
      const data = await res.json();
      setBoard(data.board);
    }
  };

  useEffect(() => {
    if (boardId) fetchBoard();
  }, [boardId]);

  const handleTaskMove = async (taskId: string, targetColId: string) => {
    await fetch(`/api/tasks/${taskId}/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetColumnId: targetColId }),
    });
    fetchBoard();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{board?.name || 'Kanban Board'}</h1>
      </div>

      {board && (
        <KanbanBoard
          columns={board.columns || []}
          onTaskMove={handleTaskMove}
          onTaskClick={(id) => setActiveTaskId(id)}
        />
      )}

      <TaskDetailModal taskId={activeTaskId} onClose={() => setActiveTaskId(null)} />
    </div>
  );
}

export default function BoardPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading board...</div>}>
      <BoardContent />
    </Suspense>
  );
}
