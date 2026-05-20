import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { projectService } from '@/server/services/project.service';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const { archive } = await req.json();

  const project = archive
    ? await projectService.archiveProject(id)
    : await projectService.restoreProject(id);

  return NextResponse.json({ success: true, project });
}
