'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface TaskTimeTrackerProps {
  loggedHours: number;
  estimatedHours?: number | null;
  onLogHours: (hours: number) => void;
}

export function TaskTimeTracker({ loggedHours, estimatedHours, onLogHours }: TaskTimeTrackerProps) {
  const [inputVal, setInputVal] = useState('1');

  return (
    <div className="p-3 border border-border rounded-md bg-card space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Time Logged: <strong>{loggedHours}h</strong></span>
        {estimatedHours && <span>Est: <strong>{estimatedHours}h</strong></span>}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="0.5"
          step="0.5"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          className="w-20 px-2 py-1 text-xs border border-input rounded bg-background"
        />
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const h = parseFloat(inputVal);
            if (!isNaN(h) && h > 0) onLogHours(h);
          }}
        >
          + Log Time
        </Button>
      </div>
    </div>
  );
}
