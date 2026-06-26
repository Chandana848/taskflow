import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId') || undefined;
  const taskId = searchParams.get('taskId') || undefined;

  const activities = await prisma.activityLog.findMany({
    where: {
      ...(workspaceId && { workspaceId }),
      ...(taskId && { taskId }),
    },
    include: { user: true, task: true },
    orderBy: { createdAt: 'desc' },
    take: 30,
  });

  return NextResponse.json({ success: true, activities });
}
