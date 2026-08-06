export function checkPayloadSize(contentLength?: string | null, maxBytes: number = 5 * 1024 * 1024): boolean {
  if (!contentLength) return true;
  const size = parseInt(contentLength, 10);
  return !isNaN(size) && size <= maxBytes;
}
