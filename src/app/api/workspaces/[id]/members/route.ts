import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId: id },
    include: { user: true },
  });

  return NextResponse.json({ success: true, members });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const { email, role } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

  const member = await prisma.workspaceMember.create({
    data: {
      workspaceId: id,
      userId: user.id,
      role: role || 'MEMBER',
    },
    include: { user: true },
  });

  return NextResponse.json({ success: true, member }, { status: 201 });
}
