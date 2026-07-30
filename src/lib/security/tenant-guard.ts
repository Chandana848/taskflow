import { prisma } from '@/lib/prisma';
import { ForbiddenError } from '@/lib/errors';

export async function assertUserInWorkspace(userId: string, workspaceId: string): Promise<string> {
  const member = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: { workspaceId, userId },
    },
  });

  if (!member) {
    throw new ForbiddenError('You are not authorized to access this workspace');
  }

  return member.role;
}
