// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Next.js ISR Demo</h1>
      <p>Welcome to the home page.</p>
      <Link href="/isr-page" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to ISR Page
      </Link>
    </main>
  );
}