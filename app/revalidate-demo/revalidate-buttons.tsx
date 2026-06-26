'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RevalidateButtons() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  async function handleRevalidate(type: 'tag' | 'path') {
    setLoading(type);
    setResult(null);
    try {
      const param = type === 'tag' ? 'tag=time-data' : 'path=/revalidate-demo';
      const res = await fetch(`/api/revalidate?${param}`, { method: 'POST' });
      const data = await res.json();
      setResult(data.message || data.error);
      router.refresh();
    } catch (e) {
      setResult('Request failed');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => handleRevalidate('tag')}
          disabled={loading !== null}
          style={{
            padding: '0.5rem 1.25rem',
            background: loading === 'tag' ? '#81c784' : '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
        >
          {loading === 'tag' ? 'Revalidating...' : 'Revalidate Tag'}
        </button>
        <button
          onClick={() => handleRevalidate('path')}
          disabled={loading !== null}
          style={{
            padding: '0.5rem 1.25rem',
            background: loading === 'path' ? '#64b5f6' : '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
        >
          {loading === 'path' ? 'Revalidating...' : 'Revalidate Path'}
        </button>
      </div>
      {result && (
        <p
          style={{
            margin: 0,
            padding: '0.5rem 0.75rem',
            background: '#f5f5f5',
            borderRadius: '4px',
            fontSize: '0.85rem',
            color: '#333',
          }}
        >
          {result}
        </p>
      )}
    </div>
  );
}
