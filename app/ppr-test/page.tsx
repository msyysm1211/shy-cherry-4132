import { Suspense } from 'react';
import { headers } from 'next/headers';

async function DynamicClock() {
  const headersList = headers();
  const ua = headersList.get('user-agent') || 'unknown';

  return (
    <div
      style={{
        padding: '1rem',
        background: '#e8f5e9',
        borderRadius: '8px',
        border: '1px solid #a5d6a7',
      }}
    >
      <h3 style={{ margin: '0 0 0.5rem' }}>Dynamic Section (streamed)</h3>
      <p>Server time: {new Date().toISOString()}</p>
      <p style={{ fontSize: '0.75rem', color: '#666', wordBreak: 'break-all' }}>
        User-Agent: {ua.slice(0, 100)}
      </p>
    </div>
  );
}

export default function StreamingTestPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Suspense Streaming Test</h1>
      <p style={{ color: '#666' }}>
        Next.js 14 — Suspense streaming (PPR requires canary, not available in
        stable)
      </p>

      <div
        style={{
          padding: '1rem',
          background: '#e3f2fd',
          borderRadius: '8px',
          border: '1px solid #90caf9',
          marginBottom: '1rem',
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem' }}>Static Section</h3>
        <p>This content renders synchronously in the initial HTML.</p>
      </div>

      <Suspense
        fallback={
          <div
            style={{
              padding: '1rem',
              background: '#f5f5f5',
              borderRadius: '8px',
              border: '1px dashed #bdbdbd',
            }}
          >
            <p>Loading dynamic content...</p>
          </div>
        }
      >
        <DynamicClock />
      </Suspense>

      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          background: '#fff3e0',
          borderRadius: '8px',
          border: '1px solid #ffcc80',
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem' }}>Streaming vs PPR</h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>
            Next.js 14 stable: Suspense enables <strong>streaming SSR</strong> —
            the entire page is dynamic, but renders in chunks
          </li>
          <li>
            True PPR (static shell + dynamic streaming) requires Next.js 15+
            with <code>experimental.ppr</code> or Next.js 16 with{' '}
            <code>cacheComponents</code>
          </li>
          <li>
            Green section: reads <code>headers()</code> to force dynamic
            rendering
          </li>
        </ul>
      </div>
    </main>
  );
}
