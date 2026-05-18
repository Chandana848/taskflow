'use client';

import React, { useState } from 'react';
import type { Workspace } from '@/hooks/useWorkspace';

export function WorkspaceSettings({ workspace }: { workspace: Workspace }) {
  const [name, setName] = useState(workspace.name);
  const [description, setDescription] = useState(workspace.description || '');
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/workspaces/${workspace.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl bg-card border rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-bold">General Settings</h2>
      <form onSubmit={handleSave} className="space-y-4">
        {saved && <div className="p-3 bg-success/10 text-success text-sm rounded-md">Settings updated successfully!</div>}
        <div>
          <label className="block text-sm font-medium mb-1">Workspace Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-background"
            rows={3}
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md">
          Save Changes
        </button>
      </form>
    </div>
  );
}
