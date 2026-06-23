'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  destructive?: boolean;
}

export function DropdownMenu({
  trigger,
  items,
  className,
}: {
  trigger: ReactNode;
  items: DropdownItem[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            'absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-popover border p-1 z-50 animate-in fade-in zoom-in-95',
            className
          )}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors text-left',
                item.destructive
                  ? 'text-destructive hover:bg-destructive/10'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
