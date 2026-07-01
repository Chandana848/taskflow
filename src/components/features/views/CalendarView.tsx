'use client';

export function CalendarView({ tasks }: { tasks: any[] }) {
  const days = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      <div className="grid grid-cols-7 bg-muted border-b text-center text-xs font-semibold py-2">
        <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
      </div>
      <div className="grid grid-cols-7 h-[500px]">
        {days.map((d) => (
          <div key={d} className="border-r border-b p-2 min-h-[80px] text-xs space-y-1">
            <span className="font-semibold text-muted-foreground">{((d - 1) % 31) + 1}</span>
            {d === 15 && tasks.length > 0 && (
              <div className="p-1 rounded bg-primary/10 text-primary truncate font-medium">
                {tasks[0].title}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
