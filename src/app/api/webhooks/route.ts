import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId');
  if (!workspaceId) return NextResponse.json({ success: false }, { status: 400 });

  const webhooks = await prisma.webhook.findMany({ where: { workspaceId } });
  return NextResponse.json({ success: true, webhooks });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { workspaceId, url, secret, events } = await req.json();
  const webhook = await prisma.webhook.create({
    data: {
      workspaceId,
      url,
      secret,
      events: events || '*',
    },
  });

  return NextResponse.json({ success: true, webhook }, { status: 201 });
}
