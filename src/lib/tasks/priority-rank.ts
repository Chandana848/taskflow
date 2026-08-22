export const PRIORITY_WEIGHTS: Record<string, number> = {
  URGENT: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
  NONE: 0
};

export function compareTaskPriority(p1: string, p2: string): number {
  const w1 = PRIORITY_WEIGHTS[p1.toUpperCase()] ?? 0;
  const w2 = PRIORITY_WEIGHTS[p2.toUpperCase()] ?? 0;
  return w2 - w1;
}
