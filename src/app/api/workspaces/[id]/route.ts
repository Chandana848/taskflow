import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { workspaceService } from '@/server/services/workspace.service';
import { updateWorkspaceSchema } from '@/lib/validations/workspace.schema';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const workspace = await workspaceService.getWorkspace(id);
  return NextResponse.json({ success: true, workspace });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const validated = updateWorkspaceSchema.parse(body);
  const updated = await workspaceService.updateWorkspace(id, validated);
  return NextResponse.json({ success: true, workspace: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await workspaceService.deleteWorkspace(id);
  return NextResponse.json({ success: true, message: 'Workspace deleted' });
}
