'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-muted text-muted-foreground border-border',
    success: 'bg-success/15 text-success border-success/30',
    warning: 'bg-warning/15 text-warning border-warning/30',
    destructive: 'bg-destructive/15 text-destructive border-destructive/30',
    outline: 'border border-border text-foreground',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border transition-colors',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
