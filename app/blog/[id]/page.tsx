export const revalidate = 30;

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default function BlogPost({ params }: { params: { id: string } }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Blog Post #{params.id}</h1>
      <p>ISR with revalidate: 30s + generateStaticParams</p>
      <p>Tests dynamic route caching + tag mapping via TableStore.</p>
      <p>Generated at: {new Date().toISOString()}</p>
      <a href="/blog">← Back to blog</a>
    </main>
  );
}
