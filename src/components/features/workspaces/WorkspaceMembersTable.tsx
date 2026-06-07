'use client';

import React, { useEffect, useState } from 'react';

interface Member {
  id: string;
  role: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    avatarUrl: string | null;
  };
}

export function WorkspaceMembersTable({ workspaceId }: { workspaceId: string }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('MEMBER');

  const fetchMembers = async () => {
    const res = await fetch(`/api/workspaces/${workspaceId}/members`);
    if (res.ok) {
      const data = await res.json();
      setMembers(data.members);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [workspaceId]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/workspaces/${workspaceId}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
    });
    if (res.ok) {
      setInviteEmail('');
      fetchMembers();
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleInvite} className="flex gap-2 max-w-lg">
        <input
          type="email"
          required
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          placeholder="colleague@company.com"
          className="flex-1 px-3 py-2 border rounded-md bg-background text-sm"
        />
        <select
          value={inviteRole}
          onChange={(e) => setInviteRole(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background text-sm"
        >
          <option value="ADMIN">Admin</option>
          <option value="MEMBER">Member</option>
          <option value="VIEWER">Viewer</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
          Invite
        </button>
      </form>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-muted/50">
                <td className="px-4 py-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                    {m.user.name?.charAt(0) || m.user.email.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{m.user.name || 'Anonymous'}</div>
                    <div className="text-xs text-muted-foreground">{m.user.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-muted font-medium">{m.role}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-xs text-destructive hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
