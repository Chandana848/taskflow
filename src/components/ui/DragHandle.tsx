'use client';

export function DragHandle() {
  return (
    <span className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M7 2a2 2 0 100 4 2 2 0 000-4zM13 2a2 2 0 100 4 2 2 0 000-4zM7 8a2 2 0 100 4 2 2 0 000-4zM13 8a2 2 0 100 4 2 2 0 000-4zM7 14a2 2 0 100 4 2 2 0 000-4zM13 14a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    </span>
  );
}
