'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  ownerId: string;
}

interface WorkspaceContextType {
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  setActiveWorkspace: (ws: Workspace) => void;
  refreshWorkspaces: () => Promise<void>;
  isLoading: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkspaces = async () => {
    try {
      const res = await fetch('/api/workspaces');
      if (res.ok) {
        const data = await res.json();
        setWorkspaces(data.workspaces);
        if (data.workspaces.length > 0 && !activeWorkspace) {
          setActiveWorkspace(data.workspaces[0]);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        activeWorkspace,
        setActiveWorkspace,
        refreshWorkspaces: fetchWorkspaces,
        isLoading,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return ctx;
}
