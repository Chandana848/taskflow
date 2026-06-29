'use client';

import { useEffect } from 'react';

export function useRealtimeEvents(onEvent?: (event: any) => void) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const eventSource = new EventSource('/api/events');

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        onEvent?.(data);
      } catch {
        // ignore parse errors
      }
    };

    return () => {
      eventSource.close();
    };
  }, [onEvent]);
}
