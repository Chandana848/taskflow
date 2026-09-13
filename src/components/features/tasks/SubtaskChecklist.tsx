'use client';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface SubtaskChecklistProps {
  subtasks: Subtask[];
  onToggle: (id: string, completed: boolean) => void;
}

export function SubtaskChecklist({ subtasks, onToggle }: SubtaskChecklistProps) {
  const completedCount = subtasks.filter(s => s.completed).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Checklist ({completedCount}/{subtasks.length})</span>
        <ProgressBar value={completedCount} max={subtasks.length || 1} className="w-24" />
      </div>
      <div className="space-y-2">
        {subtasks.map(item => (
          <label key={item.id} className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-muted/30 p-1 rounded">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={e => onToggle(item.id, e.target.checked)}
              className="rounded border-input text-primary focus:ring-primary"
            />
            <span className={item.completed ? 'line-through text-muted-foreground' : 'text-foreground'}>
              {item.title}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
