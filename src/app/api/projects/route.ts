import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { projectService } from '@/server/services/project.service';
import { createProjectSchema } from '@/lib/validations/project.schema';

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId');
  if (!workspaceId) return NextResponse.json({ success: false, message: 'workspaceId required' }, { status: 400 });

  const projects = await projectService.listWorkspaceProjects(workspaceId);
  return NextResponse.json({ success: true, projects });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId');
  if (!workspaceId) return NextResponse.json({ success: false, message: 'workspaceId required' }, { status: 400 });

  const body = await req.json();
  const validated = createProjectSchema.parse(body);
  const project = await projectService.createProject(workspaceId, validated);
  return NextResponse.json({ success: true, project }, { status: 201 });
}
