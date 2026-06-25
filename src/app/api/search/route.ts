import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const projectId = searchParams.get('projectId') || undefined;

  const tasks = await prisma.task.findMany({
    where: {
      ...(projectId && { projectId }),
      OR: [
        { title: { contains: q } },
        { description: { contains: q } },
      ],
      isArchived: false,
    },
    take: 20,
    include: { assignee: true, column: true },
  });

  return NextResponse.json({ success: true, tasks });
}
