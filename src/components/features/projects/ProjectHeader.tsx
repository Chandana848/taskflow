'use client';

import Link from 'next/link';

export function ProjectHeader({
  projectName,
  projectKey,
  color,
}: {
  projectName: string;
  projectKey: string;
  color: string;
}) {
  return (
    <div className="border-b pb-4 mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
        <h1 className="text-2xl font-bold">{projectName}</h1>
        <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground">{projectKey}</span>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
