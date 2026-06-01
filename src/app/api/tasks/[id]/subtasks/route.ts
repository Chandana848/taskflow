import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const subtasks = await prisma.subtask.findMany({
    where: { taskId: id },
    orderBy: { position: 'asc' },
  });
  return NextResponse.json({ success: true, subtasks });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const { title } = await req.json();

  const subtask = await prisma.subtask.create({
    data: {
      taskId: id,
      title,
    },
  });

  return NextResponse.json({ success: true, subtask }, { status: 201 });
}
