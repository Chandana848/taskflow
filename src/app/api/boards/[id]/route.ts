import { NextResponse } from 'next/server';
import { boardRepository } from '@/server/repositories/board.repository';
import { getSession } from '@/lib/auth/session';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const board = await boardRepository.findById(id);
  return NextResponse.json({ success: true, board });
}
