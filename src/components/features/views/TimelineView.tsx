'use client';

export function TimelineView({ tasks }: { tasks: any[] }) {
  return (
    <div className="border rounded-xl bg-card p-6 space-y-6">
      <h3 className="font-bold text-lg">Project Timeline & Sprints</h3>
      <div className="space-y-4">
        {tasks.slice(0, 5).map((t, idx) => (
          <div key={t.id} className="flex items-center gap-4">
            <span className="w-48 text-sm truncate font-medium">{t.title}</span>
            <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden relative">
              <div
                className="bg-primary h-full rounded-full"
                style={{
                  width: `${Math.max(30, (idx + 1) * 20)}%`,
                  marginLeft: `${idx * 10}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
