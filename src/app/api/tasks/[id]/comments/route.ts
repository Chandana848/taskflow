import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { commentRepository } from '@/server/repositories/comment.repository';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const comments = await commentRepository.listByTask(id);
  return NextResponse.json({ success: true, comments });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const { content } = await req.json();

  const comment = await commentRepository.create({
    content,
    task: { connect: { id } },
    author: { connect: { id: session.userId } },
  });

  return NextResponse.json({ success: true, comment }, { status: 201 });
}
