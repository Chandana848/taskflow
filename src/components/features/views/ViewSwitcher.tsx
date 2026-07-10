'use client';

export type ActiveView = 'kanban' | 'list' | 'calendar' | 'timeline';

export function ViewSwitcher({
  currentView,
  onViewChange,
}: {
  currentView: ActiveView;
  onViewChange: (v: ActiveView) => void;
}) {
  const views: { id: ActiveView; label: string }[] = [
    { id: 'kanban', label: 'Kanban Board' },
    { id: 'list', label: 'List' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'timeline', label: 'Timeline' },
  ];

  return (
    <div className="inline-flex rounded-lg border p-1 bg-muted/40">
      {views.map((v) => (
        <button
          key={v.id}
          onClick={() => onViewChange(v.id)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            currentView === v.id
              ? 'bg-card text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
