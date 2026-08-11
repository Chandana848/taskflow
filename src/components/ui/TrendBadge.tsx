'use client';

import { cn } from '@/lib/utils';

export function TrendBadge({ value, isPositive }: { value: string; isPositive: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-bold',
        isPositive ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive'
      )}
    >
      <span>{isPositive ? '↑' : '↓'}</span>
      <span>{value}</span>
    </span>
  );
}
