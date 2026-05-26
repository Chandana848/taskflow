import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const column = await prisma.column.update({ where: { id }, data: body });
  return NextResponse.json({ success: true, column });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  await prisma.column.delete({ where: { id } });
  return NextResponse.json({ success: true, message: 'Column deleted' });
}
