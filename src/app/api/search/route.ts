import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.trim() || '';
  const projectId = searchParams.get('projectId') || undefined;

  // Gracefully return empty list when query is whitespace
  if (!q && !projectId) {
    return NextResponse.json({ success: true, tasks: [] });
  }

  const tasks = await prisma.task.findMany({
    where: {
      ...(projectId && { projectId }),
      ...(q && {
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
        ],
      }),
      isArchived: false,
    },
    take: 20,
    include: { assignee: true, column: true },
  });

  return NextResponse.json({ success: true, tasks });
}
