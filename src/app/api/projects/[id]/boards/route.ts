import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const boards = await prisma.board.findMany({
    where: { projectId: id },
    include: { columns: { orderBy: { position: 'asc' } } },
  });

  return NextResponse.json({ success: true, boards });
}
