'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, label, id, ...props }, ref) => {
  const inputId = id || props.name;

  return (
    <label htmlFor={inputId} className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        id={inputId}
        ref={ref}
        className={cn(
          'w-4 h-4 rounded border-input text-primary focus:ring-primary focus:ring-offset-0',
          className
        )}
        {...props}
      />
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}
    </label>
  );
});
Checkbox.displayName = 'Checkbox';
