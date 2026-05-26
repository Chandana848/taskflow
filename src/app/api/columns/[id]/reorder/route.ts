import { NextResponse } from 'next/server';
import { columnRepository } from '@/server/repositories/column.repository';
import { getSession } from '@/lib/auth/session';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const { newPosition } = await req.json();
  const column = await columnRepository.reorder(id, newPosition);
  return NextResponse.json({ success: true, column });
}
