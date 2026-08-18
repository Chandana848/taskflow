export interface CFDDataPoint {
  date: string;
  todo: number;
  inProgress: number;
  inReview: number;
  done: number;
}

export function aggregateCFDMetrics(data: CFDDataPoint[]): { totalWip: number; throughput: number } {
  if (!data.length) return { totalWip: 0, throughput: 0 };
  const latest = data[data.length - 1];
  const totalWip = latest.inProgress + latest.inReview;
  const throughput = latest.done;
  return { totalWip, throughput };
}
