'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProjectList } from '@/components/features/projects/ProjectList';
import { CreateProjectModal } from '@/components/features/projects/CreateProjectModal';

export default function WorkspaceDetailPage() {
  const params = useParams();
  const workspaceId = params.id as string;
  const [workspace, setWorkspace] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);

  const loadData = async () => {
    const wsRes = await fetch(`/api/workspaces/${workspaceId}`);
    if (wsRes.ok) {
      const data = await wsRes.json();
      setWorkspace(data.workspace);
    }

    const projRes = await fetch(`/api/projects?workspaceId=${workspaceId}`);
    if (projRes.ok) {
      const data = await projRes.json();
      setProjects(data.projects);
    }
  };

  useEffect(() => {
    if (workspaceId) loadData();
  }, [workspaceId]);

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{workspace?.name || 'Workspace'}</h1>
        <p className="text-muted-foreground">{workspace?.description}</p>
      </div>

      <ProjectList projects={projects} onNewProject={() => setCreateProjectOpen(true)} />

      <CreateProjectModal
        workspaceId={workspaceId}
        isOpen={createProjectOpen}
        onClose={() => setCreateProjectOpen(false)}
        onCreated={loadData}
      />
    </div>
  );
}
