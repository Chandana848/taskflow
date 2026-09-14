import { TrendBadge } from './TrendBadge';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: number;
  subtitle?: string;
}

export function StatCard({ label, value, trend, subtitle }: StatCardProps) {
  return (
    <div className="p-4 bg-card border border-border rounded-lg shadow-sm">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline justify-between mt-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {trend !== undefined && (
          <TrendBadge value={`${Math.abs(trend)}%`} isPositive={trend >= 0} />
        )}
      </div>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}
