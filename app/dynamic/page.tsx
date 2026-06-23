export const dynamic = 'force-dynamic';

export default function DynamicPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Dynamic (SSR)</h1>
      <p>Server-rendered on every request — no cache interaction.</p>
      <p>Current time: {new Date().toISOString()}</p>
    </main>
  );
}
