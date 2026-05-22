'use client';

import React, { useState } from 'react';

const COLOR_PRESETS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export function CreateProjectModal({
  workspaceId,
  isOpen,
  onClose,
  onCreated,
}: {
  workspaceId: string;
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}) {
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3b82f6');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    const generated = val.replace(/[^a-zA-Z0-9]/g, '').substring(0, 4).toUpperCase();
    setKey(generated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/projects?workspaceId=${workspaceId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, key, description, color }),
      });
      if (res.ok) {
        onCreated?.();
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-card border rounded-xl shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-bold">New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Project Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-sm"
              placeholder="Mobile App"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Project Key</label>
            <input
              type="text"
              required
              maxLength={10}
              value={key}
              onChange={(e) => setKey(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border rounded-md bg-background font-mono text-sm"
              placeholder="MOB"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Accent Color</label>
            <div className="flex gap-2">
              {COLOR_PRESETS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="w-8 h-8 rounded-full border-2 transition-transform"
                  style={{
                    backgroundColor: c,
                    borderColor: color === c ? 'white' : 'transparent',
                    transform: color === c ? 'scale(1.15)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md text-sm">
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
