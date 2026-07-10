import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { exportTasksToCsv } from '@/lib/export/csv';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format') || 'json';

  const tasks = await prisma.task.findMany({
    where: { projectId: id },
    include: { column: true, assignee: true },
  });

  if (format === 'csv') {
    const csv = exportTasksToCsv(tasks);
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="tasks-${id}.csv"`,
      },
    });
  }

  return NextResponse.json({ success: true, tasks });
}
