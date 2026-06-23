'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Tooltip({
  content,
  children,
  position = 'top',
}: {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}) {
  const [visible, setVisible] = useState(false);

  const posClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={cn(
            'absolute z-50 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md animate-in fade-in',
            posClasses[position]
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
