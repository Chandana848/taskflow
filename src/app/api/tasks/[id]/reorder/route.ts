import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { taskService } from '@/server/services/task.service';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const { targetColumnId, newPosition, workspaceId } = await req.json();

  const task = await taskService.moveTask(session.userId, workspaceId || 'ws_default', {
    taskId: id,
    targetColumnId,
    newPosition: newPosition || 0,
  });

  return NextResponse.json({ success: true, task });
}
