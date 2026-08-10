'use client';

import { cn } from '@/lib/utils';

export function FilterChip({
  label,
  value,
  onRemove,
  active = false,
}: {
  label: string;
  value: string;
  onRemove?: () => void;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
        active ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-muted border-border text-muted-foreground'
      )}
    >
      <span className="font-semibold text-foreground/70">{label}:</span>
      <span>{value}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:text-foreground rounded-full"
          aria-label="Remove filter"
        >
          ✕
        </button>
      )}
    </div>
  );
}
