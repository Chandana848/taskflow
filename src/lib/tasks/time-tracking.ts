export interface TimeTrackingInfo {
  estimatedHours?: number | null;
  loggedHours: number;
}

export function calculateTimeVariance(info: TimeTrackingInfo): { variance: number; isOverEstimate: boolean } {
  const est = info.estimatedHours || 0;
  const logged = info.loggedHours || 0;
  const variance = Math.round((logged - est) * 10) / 10;
  return {
    variance,
    isOverEstimate: est > 0 && logged > est
  };
}
