'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-foreground uppercase tracking-wider">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            'w-full px-3 py-2 bg-background border rounded-lg text-sm text-foreground placeholder:text-muted-foreground min-h-[80px]',
            'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            error ? 'border-destructive focus-visible:ring-destructive' : 'border-input hover:border-muted-foreground/50',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
