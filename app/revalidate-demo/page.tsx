import { unstable_cache } from 'next/cache';
import RevalidateButtons from './revalidate-buttons';

export const revalidate = 3600;

const getCachedTime = unstable_cache(
  async () => ({ time: new Date().toISOString() }),
  ['revalidate-demo-time'],
  { tags: ['time-data'], revalidate: 3600 }
);

export default async function RevalidateDemoPage() {
  const { time: taggedTime } = await getCachedTime();

  return (
    <main style={{ padding: '2rem', maxWidth: '800px' }}>
      <h1>Revalidate Demo</h1>
      <p style={{ color: '#666' }}>
        Next.js 14 — on-demand revalidation via <code>revalidateTag</code> and{' '}
        <code>revalidatePath</code>.
      </p>

      <section
        style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: '#e8f5e9',
          borderRadius: '8px',
          border: '1px solid #a5d6a7',
        }}
      >
        <h2 style={{ margin: '0 0 1rem' }}>Tag Revalidation</h2>
        <div
          style={{
            padding: '1rem',
            background: 'white',
            borderRadius: '4px',
            marginTop: '0.5rem',
          }}
        >
          <p>
            <strong>Time data:</strong> {taggedTime}
          </p>
        </div>
      </section>

      <section
        style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: '#e3f2fd',
          borderRadius: '8px',
          border: '1px solid #90caf9',
        }}
      >
        <h2 style={{ margin: '0 0 1rem' }}>Path Revalidation</h2>
        <div
          style={{
            padding: '1rem',
            background: 'white',
            borderRadius: '4px',
            marginTop: '0.5rem',
          }}
        >
          <p>
            <strong>Page rendered at:</strong> {new Date().toISOString()}
          </p>
        </div>
      </section>

      <section
        style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: '#fff3e0',
          borderRadius: '8px',
          border: '1px solid #ffcc80',
        }}
      >
        <h2 style={{ margin: '0 0 1rem' }}>Trigger Revalidation</h2>
        <RevalidateButtons />
      </section>

      <section
        style={{
          padding: '1.5rem',
          background: '#f3e5f5',
          borderRadius: '8px',
          border: '1px solid #ce93d8',
        }}
      >
        <h2 style={{ margin: '0 0 1rem' }}>API Routes</h2>
        <ul style={{ lineHeight: 2 }}>
          <li>
            <code>POST /api/revalidate?tag=time-data</code>
          </li>
          <li>
            <code>POST /api/revalidate?path=/revalidate-demo</code>
          </li>
        </ul>
      </section>
    </main>
  );
}
