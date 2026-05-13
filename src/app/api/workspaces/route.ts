import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { workspaceService } from '@/server/services/workspace.service';
import { createWorkspaceSchema } from '@/lib/validations/workspace.schema';
import { AppError } from '@/lib/errors';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  const workspaces = await workspaceService.listUserWorkspaces(session.userId);
  return NextResponse.json({ success: true, workspaces });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const validated = createWorkspaceSchema.parse(body);
    const workspace = await workspaceService.createWorkspace(session.userId, validated);
    return NextResponse.json({ success: true, workspace }, { status: 201 });
  } catch (error: any) {
    if (error instanceof AppError) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ success: false, message: 'Failed to create workspace' }, { status: 400 });
  }
}
