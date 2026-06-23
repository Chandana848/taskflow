'use client';

import { cn } from '@/lib/utils';

export interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const initials = (name || '?')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold overflow-hidden border border-border shadow-xs',
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

export function AvatarGroup({ children, max = 3 }: { children: React.ReactNode[]; max?: number }) {
  const visible = children.slice(0, max);
  const remaining = children.length - max;

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {visible}
      {remaining > 0 && (
        <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-semibold text-muted-foreground">
          +{remaining}
        </div>
      )}
    </div>
  );
}
