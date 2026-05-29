import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { taskService } from '@/server/services/task.service';
import { taskRepository } from '@/server/repositories/task.repository';
import { updateTaskSchema } from '@/lib/validations/task.schema';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const task = await taskService.getTask(id);
  return NextResponse.json({ success: true, task });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const validated = updateTaskSchema.parse(body);
  const task = await taskService.updateTask(id, validated);
  return NextResponse.json({ success: true, task });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  await taskRepository.delete(id);
  return NextResponse.json({ success: true, message: 'Task deleted' });
}
