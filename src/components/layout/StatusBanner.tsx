'use client';
import { useState } from 'react';

interface StatusBannerProps {
  message?: string;
  type?: 'info' | 'warning' | 'alert';
}

export function StatusBanner({ message = 'All systems operational.', type = 'info' }: StatusBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const bgColors = {
    info: 'bg-primary/10 text-primary border-primary/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    alert: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <div className={`px-4 py-2 border-b text-xs flex justify-between items-center ${bgColors[type]}`}>
      <span>{message}</span>
      <button onClick={() => setDismissed(true)} className="opacity-70 hover:opacity-100 font-bold ml-4">
        ✕
      </button>
    </div>
  );
}
