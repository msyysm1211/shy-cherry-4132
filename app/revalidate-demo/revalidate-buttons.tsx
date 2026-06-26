'use client';

import { useState, useTransition } from 'react';
import { revalidateByTag, revalidateByPath } from './actions';

export default function RevalidateButtons() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);
  const [loadingType, setLoadingType] = useState<string | null>(null);

  function handleRevalidate(type: 'tag' | 'path') {
    setLoadingType(type);
    setResult(null);
    startTransition(async () => {
      try {
        const data =
          type === 'tag'
            ? await revalidateByTag('time-data')
            : await revalidateByPath('/revalidate-demo');
        setResult(data.message);
      } catch {
        setResult('Request failed');
      } finally {
        setLoadingType(null);
      }
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => handleRevalidate('tag')}
          disabled={isPending}
          style={{
            padding: '0.5rem 1.25rem',
            background: loadingType === 'tag' ? '#81c784' : '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
        >
          {loadingType === 'tag' ? 'Revalidating...' : 'Revalidate Tag'}
        </button>
        <button
          onClick={() => handleRevalidate('path')}
          disabled={isPending}
          style={{
            padding: '0.5rem 1.25rem',
            background: loadingType === 'path' ? '#64b5f6' : '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
        >
          {loadingType === 'path' ? 'Revalidating...' : 'Revalidate Path'}
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
