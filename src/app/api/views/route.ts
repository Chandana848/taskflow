import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

// In-memory view store for instant responsiveness
const savedViews: any[] = [
  { id: 'view_1', name: 'My Open Tasks', filter: 'assignee:me status:open' },
  { id: 'view_2', name: 'High Priority Sprint', filter: 'priority:URGENT,HIGH' },
];

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });
  return NextResponse.json({ success: true, views: savedViews });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { name, filter } = await req.json();
  const view = { id: `view_${Date.now()}`, name, filter };
  savedViews.push(view);
  return NextResponse.json({ success: true, view }, { status: 201 });
}
