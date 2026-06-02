import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const labels = await prisma.label.findMany({ where: { workspaceId: id } });
  return NextResponse.json({ success: true, labels });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const { name, color, description } = await req.json();

  const label = await prisma.label.create({
    data: { workspaceId: id, name, color, description },
  });

  return NextResponse.json({ success: true, label }, { status: 201 });
}
