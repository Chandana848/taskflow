import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { createColumnSchema } from '@/lib/validations/board.schema';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const validated = createColumnSchema.parse(body);

  const column = await prisma.column.create({
    data: {
      ...validated,
      boardId: id,
    },
  });

  return NextResponse.json({ success: true, column }, { status: 201 });
}
