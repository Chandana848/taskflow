import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton — base loading placeholder component.
 * Uses shimmer animation defined in tailwind.config.ts.
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-muted',
        'before:absolute before:inset-0',
        'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
        'before:animate-shimmer before:bg-[length:200%_100%]',
        className
      )}
      aria-hidden="true"
    />
  );
}

/** Skeleton text line preset */
export function SkeletonText({ className }: SkeletonProps) {
  return <Skeleton className={cn('h-4 w-full', className)} />;
}

/** Skeleton avatar preset */
export function SkeletonAvatar({ className }: SkeletonProps) {
  return <Skeleton className={cn('h-10 w-10 rounded-full', className)} />;
}

/** Skeleton card preset */
export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn('space-y-3 rounded-lg border border-border p-4', className)}>
      <div className="flex items-center gap-3">
        <SkeletonAvatar />
        <div className="flex-1 space-y-2">
          <SkeletonText className="w-1/2" />
          <SkeletonText className="w-1/4" />
        </div>
      </div>
      <SkeletonText />
      <SkeletonText className="w-3/4" />
      <SkeletonText className="w-1/2" />
    </div>
  );
}
