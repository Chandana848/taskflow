'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-md overflow-hidden mb-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 text-left font-medium text-foreground bg-card hover:bg-muted/50 transition-colors"
      >
        <span>{title}</span>
        <span className={cn('transform transition-transform text-xs text-muted-foreground', isOpen && 'rotate-180')}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="p-3 bg-background border-t border-border text-sm text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
}
