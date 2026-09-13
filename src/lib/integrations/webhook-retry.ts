export function calculateBackoffDelay(attempt: number, baseDelaySec = 5, maxDelaySec = 3600): number {
  if (attempt <= 0) return 0;
  const exp = Math.min(attempt, 8);
  const delay = baseDelaySec * Math.pow(2, exp);
  return Math.min(delay, maxDelaySec);
}

export function shouldRetryWebhook(statusCode: number, attempt: number, maxAttempts = 5): boolean {
  if (attempt >= maxAttempts) return false;
  // Retry 5xx server errors and 429 rate limit
  return (statusCode >= 500 && statusCode <= 599) || statusCode === 429;
}
