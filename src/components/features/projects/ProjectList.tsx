'use client';

import React, { useState } from 'react';
import { ProjectCard, type ProjectCardProps } from './ProjectCard';

export function ProjectList({ projects, onNewProject }: { projects: ProjectCardProps[]; onNewProject?: () => void }) {
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Filter projects by name or key..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background max-w-sm text-sm"
        />
        <button
          onClick={onNewProject}
          className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md text-sm"
        >
          + Create Project
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 border rounded-xl bg-card text-muted-foreground">
          No projects found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      )}
    </div>
  );
}
