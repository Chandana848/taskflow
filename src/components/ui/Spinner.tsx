'use client';

import { cn } from '@/lib/utils';

export function Spinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      role="status"
      className={cn('inline-block animate-spin rounded-full border-2 border-primary border-t-transparent', sizes[size], className)}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
