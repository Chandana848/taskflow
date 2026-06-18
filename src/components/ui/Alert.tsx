'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Alert({
  variant = 'info',
  title,
  children,
  className,
}: {
  variant?: 'info' | 'success' | 'warning' | 'destructive';
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const variants = {
    info: 'bg-primary/10 border-primary/20 text-foreground',
    success: 'bg-success/10 border-success/20 text-foreground',
    warning: 'bg-warning/10 border-warning/20 text-foreground',
    destructive: 'bg-destructive/10 border-destructive/20 text-destructive',
  };

  return (
    <div role="alert" className={cn('p-4 border rounded-xl text-sm space-y-1', variants[variant], className)}>
      {title && <h5 className="font-bold">{title}</h5>}
      <div className="text-xs leading-relaxed">{children}</div>
    </div>
  );
}
