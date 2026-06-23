import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  const path = request.nextUrl.searchParams.get('path');

  if (!tag && !path) {
    return NextResponse.json(
      {
        error:
          'Provide tag or path param. Example: ?tag=time-data or ?path=/revalidate-demo',
      },
      { status: 400 }
    );
  }

  const results: string[] = [];

  if (tag) {
    revalidateTag(tag);
    results.push(`revalidated tag: "${tag}"`);
  }

  if (path) {
    revalidatePath(path);
    results.push(`revalidated path: "${path}"`);
  }

  return NextResponse.json({
    success: true,
    message: results.join('; '),
    timestamp: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json({
    usage: 'POST to trigger revalidation',
    examples: [
      'POST /api/revalidate?tag=time-data',
      'POST /api/revalidate?path=/revalidate-demo',
    ],
  });
}
