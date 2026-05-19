import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { projectService } from '@/server/services/project.service';
import { projectRepository } from '@/server/repositories/project.repository';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const project = await projectService.getProject(id);
  return NextResponse.json({ success: true, project });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const updated = await projectRepository.update(id, body);
  return NextResponse.json({ success: true, project: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  await projectRepository.delete(id);
  return NextResponse.json({ success: true, message: 'Project deleted' });
}
