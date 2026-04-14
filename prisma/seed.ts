import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting TaskFlow database seeding...');

  // Clean existing tables
  await prisma.activityLog.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.subtask.deleteMany();
  await prisma.taskLabel.deleteMany();
  await prisma.label.deleteMany();
  await prisma.task.deleteMany();
  await prisma.column.deleteMany();
  await prisma.board.deleteMany();
  await prisma.project.deleteMany();
  await prisma.workspaceMember.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('Password123!', 10);

  // 1. Create Users
  const alice = await prisma.user.create({
    data: {
      email: 'alice@taskflow.dev',
      name: 'Alice Johnson',
      passwordHash,
      role: 'OWNER',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@taskflow.dev',
      name: 'Bob Smith',
      passwordHash,
      role: 'ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    },
  });

  console.log('✅ Created demo users: Alice & Bob');

  // 2. Create Workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Acme Engineering',
      slug: 'acme-eng',
      description: 'Core engineering workspace for high-growth tech projects',
      ownerId: alice.id,
      members: {
        create: [
          { userId: alice.id, role: 'OWNER' },
          { userId: bob.id, role: 'ADMIN' },
        ],
      },
    },
  });

  console.log('✅ Created workspace: Acme Engineering');

  // 3. Create Project
  const project = await prisma.project.create({
    data: {
      workspaceId: workspace.id,
      name: 'Platform v2.0',
      key: 'PLT',
      description: 'Next-gen distributed cloud backend and collaborative UI',
      color: '#3b82f6',
      leadId: alice.id,
    },
  });

  // 4. Create Board
  const board = await prisma.board.create({
    data: {
      projectId: project.id,
      name: 'Sprint Board',
      isDefault: true,
    },
  });

  // 5. Create Columns
  const colTodo = await prisma.column.create({
    data: { boardId: board.id, name: 'To Do', position: 0, color: '#3b82f6' },
  });

  const colInProgress = await prisma.column.create({
    data: { boardId: board.id, name: 'In Progress', position: 1, color: '#f59e0b' },
  });

  const colDone = await prisma.column.create({
    data: { boardId: board.id, name: 'Done', position: 2, color: '#10b981' },
  });

  console.log('✅ Created board and columns');

  // 6. Create Tasks
  await prisma.task.create({
    data: {
      projectId: project.id,
      columnId: colInProgress.id,
      title: 'Architect Next.js real-time event streaming',
      description: 'Implement Server-Sent Events endpoint with auto-reconnect semantics.',
      priority: 'URGENT',
      position: 0,
      creatorId: alice.id,
      assigneeId: bob.id,
    },
  });

  await prisma.task.create({
    data: {
      projectId: project.id,
      columnId: colTodo.id,
      title: 'Design accessible Command Palette component',
      description: 'Implement keyboard shortcut Ctrl+K search with focus trap and ARIA combobox.',
      priority: 'HIGH',
      position: 0,
      creatorId: bob.id,
      assigneeId: alice.id,
    },
  });

  await prisma.task.create({
    data: {
      projectId: project.id,
      columnId: colDone.id,
      title: 'Configure PostgreSQL Prisma database layer',
      description: 'All 18 relational models with foreign keys, cascading deletes and migrations.',
      priority: 'MEDIUM',
      position: 0,
      creatorId: alice.id,
      assigneeId: alice.id,
    },
  });

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
