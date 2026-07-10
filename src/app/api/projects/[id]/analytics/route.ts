import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { analyticsService } from '@/server/services/analytics.service';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const metrics = await analyticsService.getProjectMetrics(id);
  return NextResponse.json({ success: true, metrics });
}
