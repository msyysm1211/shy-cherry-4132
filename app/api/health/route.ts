import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    nextVersion: 14,
    timestamp: new Date().toISOString(),
  });
}
