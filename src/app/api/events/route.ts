import { getSession } from '@/lib/auth/session';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode('retry: 5000\n\n'));
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'CONNECTED', userId: session.userId })}\n\n`));

      const interval = setInterval(() => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'PING', timestamp: Date.now() })}\n\n`));
      }, 30000);

      return () => clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
