export const revalidate = 60;

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Home (ISR — revalidate: 60s)</h1>
      <p>Next.js 14 + React 18</p>
      <p>Built at: {new Date().toISOString()}</p>
      <p>
        This page tests the incremental cache read/write path through the
        Gateway OSS proxy.
      </p>
    </main>
  );
}
