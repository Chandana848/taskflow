'use client';

import React, { useState } from 'react';
import { useWorkspace } from '@/hooks/useWorkspace';
import Link from 'next/link';
import { CreateWorkspaceModal } from '@/components/features/workspaces/CreateWorkspaceModal';

export default function WorkspacesPage() {
  const { workspaces, isLoading } = useWorkspace();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Workspaces</h1>
          <p className="text-muted-foreground mt-1">Manage team projects and shared boards</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium shadow"
        >
          + New Workspace
        </button>
      </div>

      {isLoading ? (
        <div>Loading workspaces...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((ws) => (
            <Link
              key={ws.id}
              href={`/workspaces/${ws.id}`}
              className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-xl">{ws.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{ws.description || 'No description'}</p>
              <div className="mt-4 text-xs font-mono text-primary font-medium">/{ws.slug}</div>
            </Link>
          ))}
        </div>
      )}

      <CreateWorkspaceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
