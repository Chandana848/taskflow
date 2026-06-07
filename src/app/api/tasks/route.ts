import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { taskService } from '@/server/services/task.service';
import { createTaskSchema } from '@/lib/validations/task.schema';

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId') || undefined;
  const columnId = searchParams.get('columnId') || undefined;

  const tasks = await taskService.listTasks({ projectId, columnId });
  return NextResponse.json({ success: true, tasks });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId') || 'ws_default';

  const body = await req.json();
  const validated = createTaskSchema.parse(body);
  const task = await taskService.createTask(session.userId, workspaceId, validated);

  return NextResponse.json({ success: true, task }, { status: 201 });
}
