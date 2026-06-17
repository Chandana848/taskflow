'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        'px-2 py-0.5 text-xs font-mono font-semibold bg-muted border border-border rounded-md shadow-xs text-muted-foreground',
        className
      )}
    >
      {children}
    </kbd>
  );
}
