'use client';

export function StatusPill({ status, color }: { status: string; color?: string }) {
  const defaultColor = '#3b82f6';
  const resolvedColor = color || defaultColor;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border"
      style={{
        backgroundColor: `${resolvedColor}15`,
        borderColor: `${resolvedColor}40`,
        color: resolvedColor,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: resolvedColor }} />
      <span>{status}</span>
    </span>
  );
}
