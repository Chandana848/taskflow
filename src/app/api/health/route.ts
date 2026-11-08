import { NextResponse } from 'next/server';
import { APP_VERSION } from '@/lib/version';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: APP_VERSION,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  });
}
