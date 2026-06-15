// app/api/data/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    title: "ISR Demo Post",
    content: "This page is generated using Incremental Static Regeneration.",
    timestamp: new Date().toISOString(),
    views: Math.floor(Math.random() * 1000)
  };

  return NextResponse.json(data);
}