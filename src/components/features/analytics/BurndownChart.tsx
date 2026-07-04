'use client';

export function BurndownChart({ data }: { data: { day: string; remaining: number }[] }) {
  return (
    <div className="border rounded-xl bg-card p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Sprint Burndown</h3>
        <span className="text-xs text-muted-foreground">Remaining tasks vs time</span>
      </div>

      <div className="flex items-end gap-6 h-48 pt-6 border-b border-l px-4">
        {data.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-primary/80 rounded-t transition-all"
              style={{ height: `${Math.min(100, d.remaining * 20)}%` }}
            />
            <span className="text-[10px] text-muted-foreground">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
