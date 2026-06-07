import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string; memberId: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { memberId } = await params;
  const { role } = await req.json();

  const updated = await prisma.workspaceMember.update({
    where: { id: memberId },
    data: { role },
  });

  return NextResponse.json({ success: true, member: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string; memberId: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { memberId } = await params;
  await prisma.workspaceMember.delete({ where: { id: memberId } });

  return NextResponse.json({ success: true, message: 'Member removed' });
}
