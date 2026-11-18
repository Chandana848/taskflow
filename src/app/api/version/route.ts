import { NextResponse } from 'next/server';
import { getAppInfo } from '@/lib/version';

export async function GET() {
  return NextResponse.json(getAppInfo());
}
